// src/pages/Community.jsx
import { useState } from 'react'

// lang: 'ko' | 'ja' | 'zh'
function getTexts(lang) {
  const ko = {
    title: '커뮤니티 (Community)',
    intro1:
      'EAODN에 참여하는 학생들이 각자의 기록과 사진을 공유하고, 서로 코멘트를 남길 수 있는 공간입니다.',
    intro2:
      'Record 페이지에서 새 기록을 작성하면 이곳에 카드 형태로 나타납니다. 각 카드에 댓글과 공감을 남길 수 있습니다. (현재는 이 브라우저에서만 저장되는 연습용 버전입니다.)',
    writeTitle: '댓글 남기기',
    targetLabel: '대상 지점',
    nameLabel: '이름(선택)',
    namePlaceholder: '닉네임 또는 학교/동아리명',
    contentLabel: '내용',
    contentPlaceholder: '이 지점의 상황이나 소감을 자유롭게 남겨주세요.',
    notice: '* 페이지를 새로고침하면 댓글은 초기화됩니다.',
    delete: '삭제',
    deleteHint: '작성 후 24시간 이내의 댓글만 삭제할 수 있습니다.',
    commentTitle: 'Comments',
    translateBtn: (langLabel) => `번역 (${langLabel})`,
    langLabel: { ko: '한국어', ja: '日本語', zh: '中文' },
  }

  const ja = {
    title: 'コミュニティ (Community)',
    intro1:
      'EAODN に参加する学生たちが、それぞれの記録や写真を共有し、コメントを残せるスペースです。',
    intro2:
      'Record ページで新しい記録を作成すると、ここにカードとして表示されます。各カードにコメントやいいねを付けることができます。（現在はこのブラウザのみで保存される体験版です。）',
    writeTitle: 'コメントを書く',
    targetLabel: '対象地点',
    nameLabel: '名前（任意）',
    namePlaceholder: 'ニックネームまたは大学・サークル名',
    contentLabel: '内容',
    contentPlaceholder: 'この地点の状況や感想を自由に書いてください。',
    notice: '* ページを更新するとコメントはリセットされます。',
    delete: '削除',
    deleteHint: '投稿から24時間以内のコメントのみ削除できます。',
    commentTitle: 'コメント',
    translateBtn: (langLabel) => `${langLabel} に翻訳`,
    langLabel: { ko: '韓国語', ja: '日本語', zh: '中国語' },
  }

  const zh = {
    title: '社区 (Community)',
    intro1: '这是 EAODN 学生共享记录和照片、相互留言交流的空间。',
    intro2:
      '在 Record 页面创建的新记录会以卡片形式显示在这里，可以对每条记录进行留言和点赞。（目前为仅在本浏览器保存的测试版本。）',
    writeTitle: '发表留言',
    targetLabel: '目标地点',
    nameLabel: '姓名（可选）',
    namePlaceholder: '昵称或学校/社团名称',
    contentLabel: '内容',
    contentPlaceholder: '可以自由写下该地点的情况或感想。',
    notice: '* 刷新页面后，留言会被重置。',
    delete: '删除',
    deleteHint: '仅能删除发表 24 小时以内的留言。',
    commentTitle: '留言',
    translateBtn: (langLabel) => `翻译为 ${langLabel}`,
    langLabel: { ko: '韩文', ja: '日文', zh: '中文' },
  }

  if (lang === 'ja') return ja
  if (lang === 'zh') return zh
  return ko
}

// 현재 언어에 보여줄 댓글 텍스트 선택
function getCommentText(comment, lang) {
  if (comment.translations && comment.translations[lang]) {
    return comment.translations[lang]
  }
  return comment.original || ''
}

function Community({ lang = 'ko', posts, setPosts }) {
  const texts = getTexts(lang)

  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id ?? null)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  // 새 댓글 추가 (원문 + 현재 언어 필드만 채워둠)
  const handleAddComment = () => {
    if (!content.trim() || !selectedPostId) return

    const now = new Date().toISOString()
    const authorPrefix = author.trim() ? `${author.trim()}: ` : ''
    const originalText = authorPrefix + content.trim()

    setPosts((prev) =>
      prev.map((post) =>
        post.id === selectedPostId
          ? {
              ...post,
              comments: [
                ...(post.comments || []),
                {
                  id: Date.now(),
                  original: originalText,
                  createdAt: now,
                  likes: 0,
                  translations: {
                    [lang]: originalText, // 사용자가 쓰던 언어를 현재 언어로 간주
                  },
                },
              ],
            }
          : post,
      ),
    )

    setContent('')
  }

  // 공감(하트)
  const handleLike = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: (post.comments || []).map((c) =>
                c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c,
              ),
            }
          : post,
      ),
    )
  }

  // 24시간 이내 삭제
  const handleDelete = (postId, commentId) => {
    const now = Date.now()
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: (post.comments || []).filter((c) => {
            if (c.id !== commentId) return true
            const created = new Date(c.createdAt).getTime()
            const diff = now - created
            const within24h = diff < 24 * 60 * 60 * 1000
            return !within24h
          }),
        }
      }),
    )
  }

  const isDeletable = (comment) => {
    const created = new Date(comment.createdAt).getTime()
    const diff = Date.now() - created
    return diff < 24 * 60 * 60 * 1000
  }

  // 번역 버튼 눌렀을 때 (현재는 실제 번역은 안 하고, 구조만 준비)
  const handleTranslate = (postId, commentId) => {
    // ⚠️ 여기서 실제 서비스라면 번역 API 호출
    // 예시:
    // const translated = await callTranslateAPI(comment.original, lang)
    // 그다음 setPosts 로 translations[lang]에 저장

    // 지금 프로토타입에서는 "원문 그대로를 현재 언어 번역칸에 복사"만 함
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: (post.comments || []).map((c) =>
                c.id === commentId
                  ? {
                      ...c,
                      translations: {
                        ...(c.translations || {}),
                        [lang]: c.translations?.[lang] || c.original,
                      },
                    }
                  : c,
              ),
            }
          : post,
      ),
    )

    // 실제로는 여기서 번역 결과를 넣으면 됨
    // alert('지금은 번역 API가 없어 원문을 그대로 보여주고 있어요.\n나중에 서버에서 자동 번역을 붙이면 이 버튼으로 언어별 번역이 표시됩니다.')
  }

  const orderedPosts = [...posts].sort((a, b) => b.id - a.id)

  return (
    <div style={{ padding: '24px' }}>
      <h1>{texts.title}</h1>
      <p>{texts.intro1}</p>
      <p>{texts.intro2}</p>

      {/* 댓글 입력 영역 */}
      {posts.length > 0 && (
        <section
          style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#f8fafc',
          }}
        >
          <h2 style={{ marginBottom: '8px', fontSize: '18px' }}>{texts.writeTitle}</h2>
          <div style={{ marginBottom: '8px' }}>
            <label>
              {texts.targetLabel}:&nbsp;
              <select
                value={selectedPostId ?? ''}
                onChange={(e) => setSelectedPostId(Number(e.target.value))}
              >
                {orderedPosts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.location} ({post.country})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label>
              {texts.nameLabel}:&nbsp;
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={texts.namePlaceholder}
                style={{ width: '260px' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label>
              {texts.contentLabel}:&nbsp;
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={texts.contentPlaceholder}
                rows={3}
                style={{ width: '100%', maxWidth: '600px' }}
              />
            </label>
          </div>

          <button type="button" onClick={handleAddComment}>
            {texts.writeTitle}
          </button>
          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#64748b' }}>
            {texts.notice}
          </span>
          <div style={{ marginTop: '4px', fontSize: '12px', color: '#94a3b8' }}>
            {texts.deleteHint}
          </div>
        </section>
      )}

      {/* 카드 목록 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        {orderedPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px',
              backgroundColor: '#ffffff',
            }}
          >
            <h3>{post.title || post.location}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              {post.country} · {post.location}
            </p>

            {/* 이미지 */}
            <div
              style={{
                marginTop: '8px',
                marginBottom: '8px',
                height: '140px',
                borderRadius: '6px',
                border: '1px dashed #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                color: '#94a3b8',
                overflow: 'hidden',
              }}
            >
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title || post.location}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                '(사진이 등록되면 이 영역에 나타납니다.)'
              )}
            </div>

            {/* 카테고리/개수/메모 */}
            <div style={{ fontSize: '13px', marginBottom: '6px', color: '#475569' }}>
              {post.trashType && <div>Trash: {post.trashType}</div>}
              {post.quantity && <div>Quantity: {post.quantity}</div>}
              {post.notes && <div>Notes: {post.notes}</div>}
            </div>

            {/* 댓글 리스트 */}
            <div style={{ marginTop: '8px' }}>
              <strong>{texts.commentTitle}</strong>
              <ul style={{ paddingLeft: '16px', fontSize: '14px' }}>
                {(post.comments || []).map((c) => (
                  <li key={c.id} style={{ marginBottom: '6px' }}>
                    <span>{getCommentText(c, lang)}</span>
                    <div
                      style={{
                        marginTop: '2px',
                        fontSize: '12px',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {/* 인스타 느낌 하트 공감 */}
                      <button
                        type="button"
                        onClick={() => handleLike(post.id, c.id)}
                        style={{
                          padding: '0 4px',
                          borderRadius: '999px',
                          background: 'transparent',
                          boxShadow: 'none',
                          color: c.likes > 0 ? '#fb7185' : '#94a3b8',
                          fontSize: '14px',
                        }}
                      >
                        {c.likes > 0 ? `♥ ${c.likes}` : '♡'}
                      </button>

                      {/* 번역 버튼 (지금은 구조만 준비, 실제 번역은 서버 필요) */}
                      <button
                        type="button"
                        onClick={() => handleTranslate(post.id, c.id)}
                        style={{
                          padding: '2px 8px',
                          fontSize: '11px',
                          borderRadius: '999px',
                          background:
                            'linear-gradient(135deg, #0ea5e9, #22c55e)',
                        }}
                      >
                        {texts.translateBtn(texts.langLabel[lang])}
                      </button>

                      {/* 24h 안이면 삭제 버튼 */}
                      {isDeletable(c) && (
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, c.id)}
                          style={{
                            padding: '2px 8px',
                            fontSize: '11px',
                            background:
                              'linear-gradient(135deg, #fb7185, #f97316)',
                          }}
                        >
                          {texts.delete}
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community

