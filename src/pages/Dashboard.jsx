// src/pages/Dashboard.jsx
import { useMemo, useState } from 'react'

function getTexts(lang) {
  const ko = {
    title: '대시보드 (Dashboard)',
    desc:
      '국가, 위치, 쓰레기 종류에 따라 EAODN에 기록된 데이터를 바탕으로 핫스팟과 요약 통계를 보여주는 프로토타입입니다.',
    filterLocation: '국가 / 지역',
    filterTrash: '쓰레기 유형 (복수 선택 가능)',
    filterYear: '연도',
    all: '전체',
    kr: '한국',
    jp: '일본',
    cn: '중국',
    trashTypes: [
      '플라스틱 병',
      '비닐·포장재',
      '스티로폼',
      '어구·로프',
      '담배꽁초·소형플라스틱',
      '기타',
    ],
    hotspotTitle: '핫스팟 지도',
    hotspotHint:
      '빨간 점을 클릭하면 해당 지역에서 기록된 활동 요약이 오른쪽에 나타납니다.',
    summaryTitle: '요약 통계 (예시)',
    postsCount: (n) => `현재 필터 조건에서 기록 개수: ${n}건`,
    noPosts: '현재 조건에 해당하는 기록이 없습니다.',
    popupTitle: '선택된 핫스팟',
    popupEmpty: '아직 이 위치에는 기록된 데이터가 없습니다.',
    popupPostsTitle: '관련 기록',
  }

  const ja = {
    title: 'ダッシュボード (Dashboard)',
    desc:
      '国・場所・ごみの種類ごとに、EAODN に記録されたデータをもとにホットスポットとサマリー統計を表示するプロトタイプです。',
    filterLocation: '国 / 地域',
    filterTrash: 'ごみの種類（複数選択可）',
    filterYear: '年',
    all: 'すべて',
    kr: '韓国',
    jp: '日本',
    cn: '中国',
    trashTypes: [
      'ペットボトル',
      'ビニール・包装材',
      '発泡スチロール',
      '漁具・ロープ',
      'タバコの吸い殻・小型プラスチック',
      'その他',
    ],
    hotspotTitle: 'ホットスポットマップ',
    hotspotHint:
      '赤い点をクリックすると、その地域で記録された活動の概要が右側に表示されます。',
    summaryTitle: 'サマリー統計（例）',
    postsCount: (n) => `現在の条件での記録数: ${n}件`,
    noPosts: '現在の条件に合う記録がありません。',
    popupTitle: '選択されたホットスポット',
    popupEmpty: 'この場所には、まだ記録されたデータがありません。',
    popupPostsTitle: '関連する記録',
  }

  const zh = {
    title: '仪表板 (Dashboard)',
    desc:
      '根据国家、地点和垃圾类型，基于 EAODN 中记录的数据，展示热点地图和汇总统计（原型）。',
    filterLocation: '国家 / 地区',
    filterTrash: '垃圾类型（可多选）',
    filterYear: '年份',
    all: '全部',
    kr: '韩国',
    jp: '日本',
    cn: '中国',
    trashTypes: [
      '塑料瓶',
      '塑料袋·包装',
      '泡沫塑料',
      '渔具·绳索',
      '烟头·小型塑料',
      '其他',
    ],
    hotspotTitle: '热点地图',
    hotspotHint:
      '点击红色点，可以在右侧查看该地区的活动和记录概览。',
    summaryTitle: '汇总统计（示例）',
    postsCount: (n) => `当前筛选条件下的记录条数：${n}条`,
    noPosts: '当前条件下没有任何记录。',
    popupTitle: '选中的热点',
    popupEmpty: '该位置目前还没有记录。',
    popupPostsTitle: '相关记录',
  }

  if (lang === 'ja') return ja
  if (lang === 'zh') return zh
  return ko
}

// 지도 상에 표시할 대표 지점들 (위치는 %로 대충 배치)
const baseHotspots = [
  {
    id: 'seoul',
    countryCode: 'kr',
    country: 'South Korea',
    label: 'Seoul',
    labelKo: '서울',
    top: '22%',
    left: '52%',
    keywords: ['서울', 'Seoul'],
  },
  {
    id: 'busan',
    countryCode: 'kr',
    country: 'South Korea',
    label: 'Busan Haeundae',
    labelKo: '부산 해운대',
    top: '48%',
    left: '58%',
    keywords: ['부산', 'Busan', 'Haeundae', '해운대'],
  },
  {
    id: 'fukuoka',
    countryCode: 'jp',
    country: 'Japan',
    label: 'Fukuoka Bay',
    labelKo: '후쿠오카 만',
    top: '40%',
    left: '71%',
    keywords: ['Fukuoka', '후쿠오카'],
  },
  {
    id: 'nagasaki',
    countryCode: 'jp',
    country: 'Japan',
    label: 'Nagasaki',
    labelKo: '나가사키',
    top: '47%',
    left: '68%',
    keywords: ['Nagasaki', '나가사키'],
  },
  {
    id: 'qingdao',
    countryCode: 'cn',
    country: 'China',
    label: 'Qingdao',
    labelKo: '칭다오',
    top: '36%',
    left: '32%',
    keywords: ['Qingdao', '青岛', '칭다오'],
  },
  {
    id: 'shanghai',
    countryCode: 'cn',
    country: 'China',
    label: 'Shanghai',
    labelKo: '상하이',
    top: '44%',
    left: '38%',
    keywords: ['Shanghai', '上海', '상하이'],
  },
]

function Dashboard({ lang = 'ko', posts = [] }) {
  const t = getTexts(lang)

  // 간단한 필터 상태 (지금은 동작은 크게 안 써도 됨, 구조만 잡아둔 상태)
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedTrashTypes, setSelectedTrashTypes] = useState([])
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedHotspotId, setSelectedHotspotId] = useState(null)

  // 필터 조건에 맞는 posts만 추리기 (필요하면 나중에 상세하게 확장 가능)
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // 국가 필터 (post.countryCode가 있다면 활용, 없으면 대충 문자열로 판별)
      if (selectedCountry !== 'all') {
        const cc = (p.countryCode || '').toLowerCase()
        const cname = (p.country || '').toLowerCase()
        if (
          selectedCountry === 'kr' &&
          !(cc === 'kr' || cname.includes('korea') || cname.includes('한국'))
        ) {
          return false
        }
        if (
          selectedCountry === 'jp' &&
          !(cc === 'jp' || cname.includes('japan') || cname.includes('일본'))
        ) {
          return false
        }
        if (
          selectedCountry === 'cn' &&
          !(cc === 'cn' || cname.includes('china') || cname.includes('중국'))
        ) {
          return false
        }
      }

      // 연도 필터 (post.year 또는 post.date에서 연도 추출)
      if (selectedYear !== 'all') {
        const year = p.year || (p.date ? String(p.date).slice(0, 4) : null)
        if (year && year !== selectedYear) return false
      }

      // 쓰레기 유형 필터 (현재는 구조가 미정이라 selectedTrashTypes가 비어 있으면 전체 통과)
      if (selectedTrashTypes.length > 0) {
        // 예: p.trashTypes = ['Plastic bottles', 'Fishing gear']
        const types =
          p.trashTypes ||
          p.trashType ||
          [] // 형태가 어떻게 들어오든지 나중에 맞춰 쓰면 됨
        const joined = Array.isArray(types) ? types.join(' ') : String(types)
        const needAll = selectedTrashTypes.every((st) =>
          joined.toLowerCase().includes(st.toLowerCase()),
        )
        if (!needAll) return false
      }

      return true
    })
  }, [posts, selectedCountry, selectedTrashTypes, selectedYear])

  // 각 핫스팟에 어떤 기록들이 연결되는지 계산
  const hotspots = useMemo(() => {
    return baseHotspots.map((h) => {
      const related = filteredPosts.filter((p) => {
        const location = (p.location || '').toLowerCase()
        const notes = (p.notes || '').toLowerCase()
        return h.keywords.some((kw) => {
          const kwLower = kw.toLowerCase()
          return location.includes(kwLower) || notes.includes(kwLower)
        })
      })

      return {
        ...h,
        count: related.length,
        posts: related,
      }
    })
  }, [filteredPosts])

  const totalCount = filteredPosts.length

  const selectedHotspot =
    hotspots.find((h) => h.id === selectedHotspotId) || null

  const handleTrashToggle = (typeLabel) => {
    setSelectedTrashTypes((prev) =>
      prev.includes(typeLabel)
        ? prev.filter((t) => t !== typeLabel)
        : [...prev, typeLabel],
    )
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '6px' }}>{t.title}</h1>
      <p
        style={{
          fontSize: '14px',
          color: '#4b5563',
          marginTop: 0,
          marginBottom: '20px',
        }}
      >
        {t.desc}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* 왼쪽: 필터 영역 */}
        <div
          style={{
            flex: '0 0 260px',
            maxWidth: '280px',
            backgroundColor: 'rgba(255,255,255,0.96)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 10px 24px rgba(15,23,42,0.08)',
          }}
        >
          {/* 국가 필터 */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '13px',
                margin: 0,
                marginBottom: '6px',
                fontWeight: 600,
              }}
            >
              {t.filterLocation}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setSelectedCountry('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border:
                    selectedCountry === 'all'
                      ? '1px solid #0ea5e9'
                      : '1px solid #d1d5db',
                  fontSize: '12px',
                  backgroundColor:
                    selectedCountry === 'all' ? '#e0f2fe' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                {t.all}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('kr')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border:
                    selectedCountry === 'kr'
                      ? '1px solid #0ea5e9'
                      : '1px solid #d1d5db',
                  fontSize: '12px',
                  backgroundColor:
                    selectedCountry === 'kr' ? '#e0f2fe' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                {t.kr}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('jp')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border:
                    selectedCountry === 'jp'
                      ? '1px solid #0ea5e9'
                      : '1px solid #d1d5db',
                  fontSize: '12px',
                  backgroundColor:
                    selectedCountry === 'jp' ? '#e0f2fe' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                {t.jp}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCountry('cn')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border:
                    selectedCountry === 'cn'
                      ? '1px solid #0ea5e9'
                      : '1px solid #d1d5db',
                  fontSize: '12px',
                  backgroundColor:
                    selectedCountry === 'cn' ? '#e0f2fe' : '#ffffff',
                  cursor: 'pointer',
                }}
              >
                {t.cn}
              </button>
            </div>
          </section>

          {/* 쓰레기 유형 필터 (토글 버튼) */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '13px',
                margin: 0,
                marginBottom: '6px',
                fontWeight: 600,
              }}
            >
              {t.filterTrash}
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {t.trashTypes.map((label) => {
                const active = selectedTrashTypes.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleTrashToggle(label)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      border: active
                        ? '1px solid #22c55e'
                        : '1px solid #d1d5db',
                      fontSize: '11px',
                      backgroundColor: active ? '#dcfce7' : '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </section>

          {/* 연도 필터 (간단 셀렉트) */}
          <section>
            <h2
              style={{
                fontSize: '13px',
                margin: 0,
                marginBottom: '6px',
                fontWeight: 600,
              }}
            >
              {t.filterYear}
            </h2>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
              }}
            >
              <option value="all">{t.all}</option>
              <option value="2026">2023</option>
              <option value="2027">2024</option>
              <option value="2028">2025</option>
            </select>
          </section>
        </div>

        {/* 오른쪽: 지도 + 팝업 + 요약 */}
        <div style={{ flex: '1 1 480px', minWidth: '320px' }}>
          {/* 지도 + 팝업 영역 */}
          <section
            style={{
              marginBottom: '20px',
              backgroundColor: 'rgba(255,255,255,0.96)',
              borderRadius: '16px',
              padding: '14px 14px 16px 14px',
              boxShadow: '0 10px 24px rgba(15,23,42,0.08)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '6px',
              }}
            >
              <h2
                style={{
                  fontSize: '15px',
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {t.hotspotTitle}
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                }}
              >
                {t.hotspotHint}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {/* 지도 영역 */}
              <div
                style={{
                  position: 'relative',
                  flex: '1 1 260px',
                  minWidth: '260px',
                  height: '260px',
                  borderRadius: '14px',
                  background:
                    'radial-gradient(circle at 20% 10%, #bae6fd 0, transparent 55%), radial-gradient(circle at 80% 90%, #bbf7d0 0, transparent 55%), linear-gradient(135deg, #0ea5e9, #0284c7)',
                  boxShadow: '0 12px 28px rgba(15,23,42,0.25)',
                  overflow: 'hidden',
                }}
              >
                {/* 대충 동아시아 실루엣 느낌의 영역 가이드 (연한 선) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '16px',
                    borderRadius: '999px',
                    border: '1px dashed rgba(255,255,255,0.35)',
                    opacity: 0.65,
                  }}
                />

                {/* 지도 라벨들 (Korea / Japan / China) */}
                <span
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '60%',
                    fontSize: '11px',
                    color: 'rgba(248,250,252,0.9)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  KOREA
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '35%',
                    left: '73%',
                    fontSize: '11px',
                    color: 'rgba(248,250,252,0.9)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  JAPAN
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '30%',
                    fontSize: '11px',
                    color: 'rgba(248,250,252,0.9)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  CHINA
                </span>

                {/* 핫스팟 빨간 점 */}
                {hotspots.map((h) => {
                  const active = h.id === selectedHotspotId
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() =>
                        setSelectedHotspotId(
                          active ? null : h.id,
                        )
                      }
                      style={{
                        position: 'absolute',
                        top: h.top,
                        left: h.left,
                        transform: 'translate(-50%, -50%)',
                        width: active ? 18 : 14,
                        height: active ? 18 : 14,
                        borderRadius: '999px',
                        border: '2px solid #fef2f2',
                        background:
                          h.count > 0
                            ? 'rgba(239,68,68,0.95)'
                            : 'rgba(248,250,252,0.6)',
                        boxShadow: h.count
                          ? '0 0 10px rgba(220,38,38,0.75)'
                          : '0 0 6px rgba(15,23,42,0.4)',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      title={
                        h.count > 0
                          ? `${h.label} · ${h.count} records`
                          : h.label
                      }
                    />
                  )
                })}
              </div>

              {/* 오른쪽 팝업 / 상세 */}
              <div
                style={{
                  flex: '1 1 200px',
                  minWidth: '200px',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <h3
                  style={{
                    fontSize: '13px',
                    margin: 0,
                    marginBottom: '6px',
                    fontWeight: 600,
                  }}
                >
                  {t.popupTitle}
                </h3>

                {!selectedHotspot && (
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: 0,
                    }}
                  >
                    🔍 지도의 빨간 점을 클릭하면 해당 지역의 기록이 여기에
                    표시됩니다.
                  </p>
                )}

                {selectedHotspot && (
                  <div>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        margin: 0,
                        marginBottom: '4px',
                      }}
                    >
                      {selectedHotspot.labelKo || selectedHotspot.label}{' '}
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#6b7280',
                          marginLeft: '4px',
                        }}
                      >
                        ({selectedHotspot.country})
                      </span>
                    </p>
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#6b7280',
                        margin: 0,
                        marginBottom: '6px',
                      }}
                    >
                      {selectedHotspot.count > 0
                        ? `${selectedHotspot.count}개의 기록이 연결되어 있습니다.`
                        : t.popupEmpty}
                    </p>

                    {selectedHotspot.count > 0 && (
                      <>
                        <h4
                          style={{
                            fontSize: '11px',
                            margin: 0,
                            marginBottom: '4px',
                            fontWeight: 600,
                          }}
                        >
                          {t.popupPostsTitle}
                        </h4>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            maxHeight: '140px',
                            overflowY: 'auto',
                          }}
                        >
                          {selectedHotspot.posts.map((p) => (
                            <li
                              key={p.id}
                              style={{
                                marginBottom: '4px',
                                paddingBottom: '4px',
                                borderBottom: '1px dashed #e5e7eb',
                                fontSize: '11px',
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {p.title || p.location || '(제목 없음)'}
                              </div>
                              {p.notes && (
                                <div
                                  style={{
                                    color: '#6b7280',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {p.notes}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 요약 통계 영역 */}
          <section
            style={{
              backgroundColor: 'rgba(255,255,255,0.96)',
              borderRadius: '16px',
              padding: '14px 16px',
              boxShadow: '0 10px 24px rgba(15,23,42,0.08)',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                margin: 0,
                marginBottom: '6px',
              }}
            >
              {t.summaryTitle}
            </h2>
            <p
              style={{
                fontSize: '13px',
                marginTop: 0,
                marginBottom: '6px',
                color: '#111827',
              }}
            >
              {t.postsCount(totalCount)}
            </p>
            {totalCount === 0 ? (
              <p
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                {t.noPosts}
              </p>
            ) : (
              <ul
                style={{
                  fontSize: '12px',
                  color: '#4b5563',
                  margin: 0,
                  paddingLeft: '16px',
                }}
              >
                <li>
                  핫스팟 예시: 서울 · 부산 해운대 · 후쿠오카 만 · 나가사키 ·
                  칭다오 · 상하이
                </li>
                <li>
                  이후 실제 데이터가 쌓이면, 국가별/해변별 쓰레기 비율과
                  변화를 자동으로 계산해서 보여줄 수 있습니다.
                </li>
                <li>
                  지금은 레이아웃과 구조를 보여주는 프로토타입 단계입니다.
                </li>
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

