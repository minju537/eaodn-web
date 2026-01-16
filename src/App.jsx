// src/App.jsx
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Record from './pages/Record.jsx'
import Report from './pages/Report.jsx'
import Community from './pages/Community.jsx'
import MyPage from './pages/MyPage.jsx'
import { initialPosts } from './data/initialPosts.js'
import Dashboard from './pages/Dashboard.jsx'

const navTexts = {
  ko: {
    brandMain: 'EAODN',
    brandSub: 'x 버거넌스',
    home: 'Home',
    record: 'Record',
    dashboard: 'Dashboard',
    report: 'Report',
    community: 'Community',
    mypage: 'My Page',
    langKo: '한국어',
    langJa: '日本語',
    langZh: '中文',
    footer:
      'ⓒ 2025 Kookmin University EAODN x 버거넌스 Glocal Student Project',
  },

  ja: {
    brandMain: 'EAODN',
    brandSub: 'x Burgeonance',
    home: 'Home',
    record: 'Record',
    dashboard: 'Dashboard',
    report: 'Report',
    community: 'Community',
    mypage: 'My Page',
    langKo: '韓国語',
    langJa: '日本語',
    langZh: '中文',
    footer:
      'ⓒ 2025 Kookmin University EAODN x Burgeonance Glocal Student Project',
  },

  zh: {
    brandMain: 'EAODN',
    brandSub: 'x Burgeonance',
    home: 'Home',
    record: 'Record',
    dashboard: 'Dashboard',
    report: 'Report',
    community: 'Community',
    mypage: 'My Page',
    langKo: '韩文',
    langJa: '日文',
    langZh: '中文',
    footer:
      'ⓒ 2025 Kookmin University EAODN x Burgeonance Glocal Student Project',
  },
}

function App() {
  const [lang, setLang] = useState('ko')
  const [posts, setPosts] = useState(initialPosts)
  const t = navTexts[lang]

  return (
    <div className="app-root">
      {/* ───────────────────────────── */}
      {/* 상단 네비게이션 */}
      {/* ───────────────────────────── */}
      <header className="top-nav">
        {/* 왼쪽 로고 */}
        <div className="brand">
          <span className="brand-main">{t.brandMain}</span>
          <span className="brand-sub">{t.brandSub}</span>
        </div>

        {/* 오른쪽: 언어 토글 + 메뉴 */}
        <div className="top-right">
          <div className="top-lang-toggle">
            <button
              type="button"
              onClick={() => setLang('ko')}
              className={lang === 'ko' ? 'lang-pill active' : 'lang-pill'}
            >
              {t.langKo}
            </button>

            <button
              type="button"
              onClick={() => setLang('ja')}
              className={lang === 'ja' ? 'lang-pill active' : 'lang-pill'}
            >
              {t.langJa}
            </button>

            <button
              type="button"
              onClick={() => setLang('zh')}
              className={lang === 'zh' ? 'lang-pill active' : 'lang-pill'}
            >
              {t.langZh}
            </button>
          </div>

          <nav className="nav-links">
            <Link to="/">{t.home}</Link>
            <Link to="/record">{t.record}</Link>
            <Link to="/dashboard">{t.dashboard}</Link>
            <Link to="/report">{t.report}</Link>
            <Link to="/community">{t.community}</Link>
            <Link to="/mypage">{t.mypage}</Link>
          </nav>
        </div>
      </header>

      {/* ───────────────────────────── */}
      {/* 메인 페이지 영역 */}
      {/* ───────────────────────────── */}
      <main className="page-shell">
        <Routes>
          <Route
            path="/"
            element={<Home lang={lang} setLang={setLang} />}
          />

          <Route
            path="/record"
            element={<Record lang={lang} posts={posts} setPosts={setPosts} />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard lang={lang} posts={posts} />}
          />


          <Route path="/report" element={<Report lang={lang} />} />

          <Route
            path="/community"
            element={<Community lang={lang} posts={posts} setPosts={setPosts} />}
          />

          <Route
            path="/mypage"
            element={<MyPage lang={lang} posts={posts} />}
          />
        </Routes>
      </main>

      {/* ───────────────────────────── */}
      {/* 푸터 */}
      {/* ───────────────────────────── */}
      <footer className="site-footer">
        <span>{t.footer}</span>
      </footer>
    </div>
  )
}

export default App
