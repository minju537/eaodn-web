// src/pages/MyPage.jsx
import { useState, useMemo } from 'react'

function getTexts(lang) {
  const ko = {
    title: 'My Page',
    desc: '로그인 후, 내가 올린 글을 블로그처럼 모아볼 수 있는 공간입니다. (현재는 프로토타입이에요)',
    loginTitle: '로그인 · 프로필 설정',
    schoolLabel: '학교',
    passwordLabel: '비밀번호',
    nicknameLabel: '닉네임 (화면에 보이는 이름)',
    emojiLabel: '프로필 이모지',
    colorLabel: '프로필 색상',
    imageLabel: '프로필 이미지 업로드',
    bioLabel: '한 줄 소개',
    loginButton: '로그인 / 업데이트',
    hint: '※ 실제 로그인 기능은 아직 없고, 이 페이지 안에서만 사용하는 프로토타입입니다.',
    loggedInAs: '현재 프로필',
    postsTitle: '내가 올린 글 (프로토타입)',
    postsDesc:
      '지금은 예시 단계라 EAODN에 올라온 글 전체를 보여주고 있습니다. 나중에 계정 시스템이 생기면 “내 계정으로 올린 글만” 필터링할 수 있어요.',
    noPosts: '아직 등록된 글이 없습니다.',
  }

  const ja = {
    title: 'My Page',
    desc:
      'ログインすると、自分が投稿した記事をブログのようにまとめて見ることができるスペースです。（現在はプロトタイプです）',
    loginTitle: 'ログイン・プロフィール設定',
    schoolLabel: '学校',
    passwordLabel: 'パスワード',
    nicknameLabel: 'ニックネーム（画面に表示される名前）',
    emojiLabel: 'プロフィール絵文字',
    colorLabel: 'プロフィールカラー',
    imageLabel: 'プロフィール画像アップロード',
    bioLabel: 'ひとこと紹介',
    loginButton: 'ログイン / 更新',
    hint: '※ 本物のログイン機能ではなく、このページ内だけで動くプロトタイプです。',
    loggedInAs: '現在のプロフィール',
    postsTitle: '自分の投稿（プロトタイプ）',
    postsDesc:
      '今はサンプル段階なので、EAODN に登録された全ての投稿を表示しています。将来アカウント機能が付けば、「自分のアカウントで投稿したものだけ」を絞り込む予定です。',
    noPosts: 'まだ投稿がありません。',
  }

  const zh = {
    title: 'My Page',
    desc: '登录后，这里可以像博客一样集中查看自己发布的内容。（目前是原型版本）',
    loginTitle: '登录 · 个人资料设置',
    schoolLabel: '学校',
    passwordLabel: '密码',
    nicknameLabel: '昵称（页面上显示的名字）',
    emojiLabel: '头像表情符号',
    colorLabel: '头像背景颜色',
    imageLabel: '上传头像图片',
    bioLabel: '一句话介绍',
    loginButton: '登录 / 更新',
    hint: '※ 还不是真正的登录功能，只是在此页面内部使用的原型。',
    loggedInAs: '当前个人资料',
    postsTitle: '我的帖子（原型）',
    postsDesc:
      '目前还在原型阶段，因此会展示 EAODN 中的全部帖子。未来接入账号系统后，将只显示“由本账号发布”的内容。',
    noPosts: '还没有任何帖子。',
  }

  if (lang === 'ja') return ja
  if (lang === 'zh') return zh
  return ko
}

function MyPage({ lang = 'ko', posts = [] }) {
  const t = getTexts(lang)

  // 프로필 / 로그인 상태 (프론트엔드 전용)
  const [school, setSchool] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [emoji, setEmoji] = useState('🌊')
  const [color, setColor] = useState('#0ea5e9')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoggedIn(true)
  }

  // 지금은 예시: 전체 posts를 "내 글"처럼 보여줌
  const myPosts = useMemo(() => posts, [posts])

  return (
    <div style={{ padding: '8px' }}>
      <h1 style={{ marginBottom: '4px' }}>{t.title}</h1>
      <p
        style={{
          fontSize: '14px',
          color: '#4b5563',
          marginTop: 0,
          marginBottom: '16px',
        }}
      >
        {t.desc}
      </p>

      {/* 상단: 로그인 / 프로필 영역 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'flex-start',
        }}
      >
        {/* 로그인/설정 폼 */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: '1 1 260px',
            maxWidth: '420px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderRadius: '16px',
            padding: '16px 18px',
            boxShadow: '0 12px 26px rgba(15,23,42,0.12)',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              marginTop: 0,
              marginBottom: '8px',
            }}
          >
            {t.loginTitle}
          </h2>
          <p
            style={{
              fontSize: '11px',
              color: '#6b7280',
              marginTop: 0,
              marginBottom: '12px',
            }}
          >
            {t.hint}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px' }}>
              {t.schoolLabel}
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '2px',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '13px',
                }}
              />
            </label>

            <label style={{ fontSize: '12px' }}>
              {t.passwordLabel}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '2px',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '13px',
                }}
              />
            </label>

            <label style={{ fontSize: '12px' }}>
              {t.nicknameLabel}
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '2px',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '13px',
                }}
              />
            </label>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontSize: '12px',
              }}
            >
              <label style={{ flex: 1 }}>
                {t.emojiLabel}
                <input
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: '2px',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '13px',
                  }}
                  placeholder="예: 🌊, 🐟, 🌱"
                />
              </label>

              <label style={{ width: '110px' }}>
                {t.colorLabel}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: '4px',
                    padding: 0,
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    height: '32px',
                    cursor: 'pointer',
                  }}
                />
              </label>
            </div>

            <label style={{ fontSize: '12px' }}>
              {t.imageLabel}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setProfileImage(url)
                  }
                }}
                style={{
                  width: '100%',
                  marginTop: '4px',
                  fontSize: '12px',
                }}
              />
            </label>

            <label style={{ fontSize: '12px' }}>
              {t.bioLabel}
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '2px',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '13px',
                }}
                placeholder="예: 해양쓰레기 줄이기 프로젝트 중!"
              />
            </label>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '8px 10px',
              borderRadius: '999px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
              color: '#ffffff',
              boxShadow: '0 10px 24px rgba(34,197,94,0.45)',
            }}
          >
            {t.loginButton}
          </button>
        </form>

        {/* 오른쪽: 프로필 카드 */}
        <div
          style={{
            flex: '1 1 220px',
            minWidth: '220px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '16px 18px',
            boxShadow: '0 12px 26px rgba(15,23,42,0.12)',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              marginTop: 0,
              marginBottom: '10px',
            }}
          >
            {t.loggedInAs}
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '999px',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '30px' }}>{emoji || '🌊'}</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  marginBottom: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {nickname || '익명 사용자'}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {school || '학교 정보 미입력'}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#4b5563',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {bio || (loggedIn ? '프로필을 자유롭게 꾸며보세요 ✨' : '')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 내 글 목록 */}
      <section style={{ marginTop: '28px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '4px' }}>{t.postsTitle}</h2>
        <p
          style={{
            fontSize: '12px',
            color: '#6b7280',
            marginTop: 0,
            marginBottom: '10px',
          }}
        >
          {t.postsDesc}
        </p>

        {myPosts.length === 0 ? (
          <p
            style={{
              fontSize: '13px',
              color: '#6b7280',
            }}
          >
            {t.noPosts}
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: '12px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            }}
          >
            {myPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 10px 22px rgba(15,23,42,0.08)',
                  padding: '10px 12px',
                  fontSize: '13px',
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.title || post.location || '(제목 없음)'}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {post.country} · {post.location}
                </div>
                {post.notes && (
                  <p
                    style={{
                      fontSize: '12px',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {post.notes}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default MyPage
