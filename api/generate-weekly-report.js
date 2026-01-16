// api/generate-weekly-report.js
import { createClient } from '@supabase/supabase-js'

function toKstDateParts(date = new Date()) {
  // KST 기준 날짜 계산 (UTC+9)
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  return { y: kst.getUTCFullYear(), m: kst.getUTCMonth(), d: kst.getUTCDate() }
}

function getLastWeekRangeKST(now = new Date()) {
  // "지난주(월~일)" 범위를 KST 기준으로 계산
  const { y, m, d } = toKstDateParts(now)
  const todayKstMidnightUtc = new Date(Date.UTC(y, m, d)) // KST 00:00를 UTC로 표현한 값

  // 요일: 월=1 ... 일=0(일요일) 형태로 맞추기 위해 계산
  const day = (todayKstMidnightUtc.getUTCDay() + 6) % 7 // 월=0 ... 일=6
  const thisWeekMon = new Date(todayKstMidnightUtc)
  thisWeekMon.setUTCDate(thisWeekMon.getUTCDate() - day)

  const lastWeekMon = new Date(thisWeekMon)
  lastWeekMon.setUTCDate(lastWeekMon.getUTCDate() - 7)

  const lastWeekSunEnd = new Date(thisWeekMon)
  lastWeekSunEnd.setUTCSeconds(lastWeekSunEnd.getUTCSeconds() - 1) // 일요일 23:59:59

  const weekStartStr = lastWeekMon.toISOString().slice(0, 10) // YYYY-MM-DD
  const weekEndStr = new Date(thisWeekMon.getTime() - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  return {
    weekStartStr,
    weekEndStr,
    // posts 조회 범위: lastWeekMon(포함) ~ thisWeekMon(미포함)
    rangeStartIso: lastWeekMon.toISOString(),
    rangeEndIso: thisWeekMon.toISOString(),
  }
}

async function callOpenAI({ apiKey, input }) {
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input,
      temperature: 0.2,
    }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.error?.message || `OpenAI HTTP ${res.status}`)
  }

  // Responses API는 output_text가 있을 수도, output 배열 구조일 수도 있음
  const text =
    json.output_text ||
    (Array.isArray(json.output)
      ? json.output
          .flatMap((o) => o.content || [])
          .map((c) => c.text)
          .filter(Boolean)
          .join('\n')
      : '')

  if (!text) throw new Error('OpenAI returned empty text')
  return { text, model: json.model || 'unknown' }
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const openaiKey = process.env.OPENAI_API_KEY

    if (!supabaseUrl || !supabaseServiceKey || !openaiKey) {
      res.status(500).json({
        error:
          'Missing env vars. Need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY',
      })
      return
    }

    const sb = createClient(supabaseUrl, supabaseServiceKey)
    const { weekStartStr, weekEndStr, rangeStartIso, rangeEndIso } =
      getLastWeekRangeKST(new Date())

    // ✅ 중복 방지: 이미 해당 week_start 리포트가 있으면 그냥 종료
    const { data: existing, error: exErr } = await sb
      .from('weekly_reports')
      .select('id, week_start')
      .eq('week_start', weekStartStr)
      .limit(1)

    if (exErr) throw exErr
    if (existing && existing.length > 0) {
      res.status(200).json({ ok: true, message: 'Already exists', weekStartStr })
      return
    }

    // 지난주 posts 로드
    const { data: posts, error: pErr } = await sb
      .from('posts')
      .select('country, location, title, trash_type, quantity, notes, created_at')
      .gte('created_at', rangeStartIso)
      .lt('created_at', rangeEndIso)
      .order('created_at', { ascending: true })

    if (pErr) throw pErr

    // AI 입력 데이터 축약(너무 길어지면 비용/실패 가능)
    const compact = (posts || []).slice(0, 400).map((p) => ({
      country: p.country,
      location: p.location,
      title: p.title,
      trashType: p.trash_type,
      quantity: p.quantity,
      notes: p.notes,
      created_at: p.created_at,
    }))

    const input = [
      {
        role: 'system',
        content:
          'You are an analyst for EAODN (East Asia Ocean Data Network). Produce a concise weekly insight report in Korean. Output MUST be valid JSON only.',
      },
      {
        role: 'user',
        content: `기간: ${weekStartStr} ~ ${weekEndStr}\n데이터(최대 400개): ${JSON.stringify(
          compact,
        )}\n\n아래 스키마 JSON으로만 답해:\n{\n  "summary": "3~8문장 요약",\n  "highlights": {\n    "total_posts": number,\n    "top_countries": [{"country": string, "count": number}],\n    "top_locations": [{"location": string, "count": number}],\n    "trash_type_distribution": [{"trashType": string, "count": number}]\n  },\n  "recommendations": ["액션 제안 3~6개"]\n}`,
      },
    ]

    const { text, model } = await callOpenAI({ apiKey: openaiKey, input })

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      throw new Error('AI did not return valid JSON')
    }

    const payload = {
      week_start: weekStartStr,
      week_end: weekEndStr,
      status: 'success',
      model,
      summary: parsed.summary || '',
      highlights: parsed.highlights || {},
      recommendations: parsed.recommendations || [],
    }

    const { error: insErr } = await sb.from('weekly_reports').insert(payload)
    if (insErr) throw insErr

    res.status(200).json({ ok: true, weekStartStr })
  } catch (e) {
    // 실패 기록도 남기기(가능하면)
    try {
      const supabaseUrl = process.env.SUPABASE_URL
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (supabaseUrl && supabaseServiceKey) {
        const sb = createClient(supabaseUrl, supabaseServiceKey)
        const { weekStartStr, weekEndStr } = getLastWeekRangeKST(new Date())
        await sb.from('weekly_reports').insert({
          week_start: weekStartStr,
          week_end: weekEndStr,
          status: 'failed',
          error_message: e?.message || String(e),
        })
      }
    } catch {
      // ignore
    }

    res.status(500).json({ error: e?.message || String(e) })
  }
}

