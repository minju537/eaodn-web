// src/pages/Record.jsx
import { useState } from 'react'

const TRASH_TYPES = [
  'Plastic bottles',
  'Plastic bags & packaging',
  'Styrofoam & foamed plastics',
  'Fishing gear & ropes',
  'Cigarette butts & small plastics',
  'Others',
]

function getTexts(lang) {
  const ko = {
    title: '데이터 기록 (Record)',
    desc1:
      'EAODN 공통 기준에 따라 해양쓰레기 데이터를 기록하는 페이지입니다. 아래 폼에 정보를 입력한 뒤, 커뮤니티에 게시할 수 있습니다.',
    desc2:
      ' 이 웹사이트 안에서 직접 제목·사진·카테고리·국가 등을 선택해 기록을 남길 수 있습니다.',
    country: '국가',
    location: '지역 / 해변 이름',
    titleLabel: '제목',
    imageUrl: '사진 URL (선택)',
    trashType: '쓰레기 종류 (6개 카테고리)',
    quantity: '개수 / 대략적인 양',
    notes: '추가 메모',
    countryOptions: {
      'South Korea': '대한민국',
      Japan: '일본',
      China: '중국',
    },
    trashLabel: {
      'Plastic bottles': '플라스틱 병',
      'Plastic bags & packaging': '비닐봉지·포장재',
      'Styrofoam & foamed plastics': '스티로폼·발포 플라스틱',
      'Fishing gear & ropes': '어구·로프류',
      'Cigarette butts & small plastics': '담배꽁초·소형 플라스틱',
      Others: '기타',
    },
    btnCreate: '새 기록 커뮤니티에 게시',
    btnUpdate: '선택한 기록 수정 저장',
    draftsTitle: '기존 기록 선택 후 수정하기',
    selectPlaceholder: '수정할 기록을 선택하세요',
  }

  const ja = {
    title: 'データ記録 (Record)',
    desc1:
      'EAODN 共通基準にしたがって海洋ごみデータを記録するページです。以下のフォームに入力し、コミュニティに投稿できます。',
    desc2:
      'このサイト内でタイトル・写真・カテゴリ・国などを選んで記録できます。',
    country: '国',
    location: '地域 / ビーチ名',
    titleLabel: 'タイトル',
    imageUrl: '写真 URL（任意）',
    trashType: 'ごみの種類（6カテゴリ）',
    quantity: '個数 / おおよその量',
    notes: 'メモ',
    countryOptions: {
      'South Korea': '韓国',
      Japan: '日本',
      China: '中国',
    },
    trashLabel: {
      'Plastic bottles': 'ペットボトル',
      'Plastic bags & packaging': 'ビニール袋・包装材',
      'Styrofoam & foamed plastics': '発泡スチロールなど',
      'Fishing gear & ropes': '漁具・ロープ類',
      'Cigarette butts & small plastics': 'たばこの吸い殻・小さなプラスチック',
      Others: 'その他',
    },
    btnCreate: '新規記録をコミュニティに投稿',
    btnUpdate: '選択中の記録を更新',
    draftsTitle: '既存の記録を選んで編集',
    selectPlaceholder: '編集する記録を選択してください',
  }

  const zh = {
    title: '数据记录 (Record)',
    desc1:
      '这里是根据 EAODN 统一标准记录海洋垃圾数据的页面。填写下方表单后，可以发布到社区。',
    desc2:
     ' 而是在本网站中直接填写标题、照片、类别、国家等信息。',
    country: '国家',
    location: '地区 / 海滩名称',
    titleLabel: '标题',
    imageUrl: '图片 URL（可选）',
    trashType: '垃圾类型（6大类别）',
    quantity: '数量 / 大致数量',
    notes: '备注',
    countryOptions: {
      'South Korea': '韩国',
      Japan: '日本',
      China: '中国',
    },
    trashLabel: {
      'Plastic bottles': '塑料瓶',
      'Plastic bags & packaging': '塑料袋·包装物',
      'Styrofoam & foamed plastics': '泡沫塑料',
      'Fishing gear & ropes': '渔具·绳索',
      'Cigarette butts & small plastics': '烟头·小塑料',
      Others: '其他',
    },
    btnCreate: '发布新记录到社区',
    btnUpdate: '保存所选记录的修改',
    draftsTitle: '选择已有记录进行修改',
    selectPlaceholder: '请选择要修改的记录',
  }

  if (lang === 'ja') return ja
  if (lang === 'zh') return zh
  return ko
}

function Record({ lang = 'ko', posts, setPosts }) {
  const t = getTexts(lang)

  const [form, setForm] = useState({
    country: 'South Korea',
    location: '',
    title: '',
    imageUrl: '',
    trashType: TRASH_TYPES[0],
    quantity: '',
    notes: '',
  })

  const [editingId, setEditingId] = useState(null)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // 새 기록 커뮤니티에 게시
  const handleCreate = () => {
    if (!form.location.trim() || !form.title.trim()) return

    const newPost = {
      id: Date.now(),
      country: form.country,
      location: form.location.trim(),
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim(),
      trashType: form.trashType,
      quantity: form.quantity.trim(),
      notes: form.notes.trim(),
      comments: [],
    }

    setPosts((prev) => [newPost, ...prev])

    setForm({
      country: form.country,
      location: '',
      title: '',
      imageUrl: '',
      trashType: TRASH_TYPES[0],
      quantity: '',
      notes: '',
    })

    setEditingId(null)
  }

  // 기존 기록 선택 → 폼에 로드
  const handleSelectExisting = (id) => {
    if (!id) {
      setEditingId(null)
      return
    }
    const post = posts.find((p) => p.id === Number(id))
    if (!post) return
    setEditingId(post.id)
    setForm({
      country: post.country || 'South Korea',
      location: post.location || '',
      title: post.title || '',
      imageUrl: post.imageUrl || '',
      trashType: post.trashType || TRASH_TYPES[0],
      quantity: post.quantity?.toString?.() || '',
      notes: post.notes || '',
    })
  }

  // 선택한 기록 수정 저장
  const handleUpdate = () => {
    if (!editingId) return

    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? {
              ...p,
              country: form.country,
              location: form.location.trim(),
              title: form.title.trim(),
              imageUrl: form.imageUrl.trim(),
              trashType: form.trashType,
              quantity: form.quantity.trim(),
              notes: form.notes.trim(),
            }
          : p,
      ),
    )
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>{t.title}</h1>
      <p>{t.desc1}</p>
      <p>{t.desc2}</p>

      {/* 기록 입력 폼 */}
      <section
        style={{
          marginTop: '16px',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#f8fafc',
        }}
      >
        <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>{t.title}</h2>

        {/* 국가 & 지역 */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
          <div style={{ flex: '0 0 180px' }}>
            <label>
              {t.country}
              <br />
              <select
                value={form.country}
                onChange={(e) => handleChange('country', e.target.value)}
                style={{ width: '100%' }}
              >
                {Object.entries(t.countryOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <label>
              {t.location}
              <br />
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
        </div>

        {/* 제목 & 이미지 URL */}
        <div style={{ marginBottom: '8px' }}>
          <label>
            {t.titleLabel}
            <br />
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
  <label>
    {t.imageUrl}
    <br />
    {/* 1) URL 직접 입력 */}
    <input
      type="text"
      value={form.imageUrl}
      onChange={(e) => handleChange('imageUrl', e.target.value)}
      placeholder="https:// 로 시작하는 이미지 주소를 넣을 수 있습니다 (선택)."
      style={{ width: '100%', marginBottom: '6px' }}
    />
  </label>

  {/* 2) 또는 내 컴퓨터에서 파일 선택 */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      // 임시 blob URL을 form.imageUrl에 넣어서 Community에서 바로 보여주기
      handleChange('imageUrl', url)
    }}
  />
  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
    * 로컬 파일을 선택하면 이 브라우저에서만 임시로 이미지가 표시됩니다.
    (페이지를 새로고침하면 사라집니다.)
  </div>
</div>


        {/* 카테고리 & 개수 */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <label>
              {t.trashType}
              <br />
              <select
                value={form.trashType}
                onChange={(e) => handleChange('trashType', e.target.value)}
                style={{ width: '100%' }}
              >
                {TRASH_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t.trashLabel[type]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ flex: '0 0 200px' }}>
            <label>
              {t.quantity}
              <br />
              <input
                type="text"
                value={form.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
        </div>

        {/* 메모 */}
        <div style={{ marginBottom: '8px' }}>
          <label>
            {t.notes}
            <br />
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        {/* 버튼들 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button type="button" onClick={handleCreate}>
            {t.btnCreate}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleUpdate}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #22c55e)',
              }}
            >
              {t.btnUpdate}
            </button>
          )}
        </div>
      </section>

      {/* 기존 기록 선택해서 수정 */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '6px' }}>{t.draftsTitle}</h2>
        <select
          style={{ minWidth: '260px' }}
          value={editingId || ''}
          onChange={(e) => handleSelectExisting(e.target.value || null)}
        >
          <option value="">{t.selectPlaceholder}</option>
          {posts.map((p) => (
            <option key={p.id} value={p.id}>
              [{t.countryOptions[p.country] || p.country}] {p.location} - {p.title}
            </option>
          ))}
        </select>
      </section>
    </div>
  )
}

export default Record