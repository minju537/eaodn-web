// src/pages/Home.jsx

function getTexts(lang) {
  const ko = {
    tag: 'Glocal Student Project · Kookmin Univ.',
    title: 'EAODN: East Asia Ocean Data Network',
    highlight: 'Marine Debris Data Hub',
    sub: 'EAODN은 한국·중국·일본 대학생이 같은 기준으로 해양쓰레기 데이터를 기록하고, 서로 비교·공유하는 학생 주도 플랫폼입니다.',
    bullets: [
      '표준화된 6개 쓰레기 카테고리로 기록',
      '국가·지역별 핫스팟 지도와 대시보드',
      '주간 인사이트 리포트 자동 생성(예정)',
      '사진과 코멘트로 서로의 바다 상황 공유',
    ],
    cardTitle: '동아시아 바다 · 해양쓰레기 · 기후',
    cardItems: [
      '해양쓰레기(플라스틱, 스티로폼, 어구 등)를 데이터로 기록',
      '연도·국가·해변별로 누적 변화를 한눈에 비교',
      '기후·에너지·어업 정책 논의에 연결 가능한 학생 데이터',
    ],
    sectionTitle: '이 웹사이트는 무엇인가요?',
    sectionDesc:
      '이 웹사이트는 국민대학교 학생 팀 “버거넌스”와 EAODN이 함께 만드는 동아시아 해양쓰레기 데이터 협력 허브의 프로토타입입니다.',
    cards: [
      {
        title: '학생 주도 Glocal 프로젝트',
        text: '국민대학교 학생들이 기획·설계한 프로젝트로, 동아시아(한국·중국·일본)를 잇는 글로컬(glocal) 환경 협력 모델을 실험합니다.',
      },
      {
        title: '쉬운 기록, 의미 있는 데이터',
        text: 'Record 페이지에서 간단한 폼으로 위치·카테고리·개수·사진을 남기면, Dashboard·Community에서 바로 시각화됩니다.',
      },
      {
        title: '정책·연구로 확장 가능한 플랫폼',
        text: '수집된 데이터는 향후 지자체, 연구자, 시민단체와의 협력 연구 및 정책 제안의 근거 자료로 확장될 수 있도록 설계되었습니다.',
      },
    ],
  }

  const ja = {
    tag: 'Glocal Student Project · Kookmin Univ.',
    title: 'EAODN: East Asia Ocean Data Network',
    highlight: '海洋ごみデータハブ',
    sub: 'EAODN は韓国・中国・日本の大学生が共通基準で海洋ごみデータを記録し、比較・共有する学生主導のプラットフォームです。',
    bullets: [
      '標準化された 6 種類のごみカテゴリで記録',
      '国・地域別ホットスポットマップとダッシュボード',
      '週間インサイトレポートの自動生成（予定）',
      '写真とコメントでお互いの海の状況を共有',
    ],
    cardTitle: '東アジアの海 · 海洋ごみ · 気候',
    cardItems: [
      '海洋ごみ（プラスチック、発泡スチロール、漁具など）をデータとして記録',
      '年・国・ビーチ別の変化を一目で比較',
      '気候・エネルギー・漁業政策の議論につながる学生データ',
    ],
    sectionTitle: 'このウェブサイトについて',
    sectionDesc:
      'このサイトは、国民大学の学生チーム「バージョナンス」と EAODN が共同で制作する、東アジア海洋ごみデータ協力ハブのプロトタイプです。',
    cards: [
      {
        title: '学生主導のグローカルプロジェクト',
        text: '国民大学の学生が企画・設計したプロジェクトで、東アジア（韓中日）をつなぐグローカルな環境協力モデルを試みています。',
      },
      {
        title: '簡単な記録、意味のあるデータ',
        text: 'Record ページで地点・カテゴリ・数量・写真を入力すると、Dashboard と Community で即座に可視化されます。',
      },
      {
        title: '政策・研究へと広がるプラットフォーム',
        text: '集約されたデータは、自治体・研究者・市民団体との協働研究や政策提言の基礎資料としての活用を目指しています。',
      },
    ],
  }

  const zh = {
    tag: 'Glocal Student Project · Kookmin Univ.',
    title: 'EAODN: East Asia Ocean Data Network',
    highlight: '海洋垃圾数据枢纽',
    sub: 'EAODN 是由韩国、中国、日本的大学生共同参与，以统一标准记录和对比海洋垃圾数据的学生主导平台。',
    bullets: [
      '以 6 大标准类别记录海洋垃圾',
      '按国家与地区展示热点地图和仪表板',
      '自动生成周度洞察报告（计划中）',
      '通过照片与评论共享各地海洋状况',
    ],
    cardTitle: '东亚海洋 · 海洋垃圾 · 气候',
    cardItems: [
      '将塑料、泡沫、渔具等海洋垃圾转化为数据',
      '按年份、国家、海滩对比累积变化',
      '为气候、能源与渔业政策讨论提供学生数据基础',
    ],
    sectionTitle: '这个网站是什么？',
    sectionDesc:
      '本网站是由国民大学学生团队 “Burgeonance(버거넌스)” 与 EAODN 共同打造的东亚海洋垃圾数据协作平台原型。',
    cards: [
      {
        title: '学生主导的 Glocal 项目',
        text: '由国民大学学生负责策划和设计，探索连接东亚（韩·中·日）的“全球 × 地方”环境合作模式。',
      },
      {
        title: '简单记录，形成有价值的数据',
        text: '在 Record 页面填写地点、类别、数量和照片后，即可在 Dashboard 与 Community 中立刻可视化。',
      },
      {
        title: '通往政策与研究的平台',
        text: '累积的数据未来可与地方政府、研究者和市民组织合作，用作研究和政策建议的依据。',
      },
    ],
  }

  if (lang === 'ja') return ja
  if (lang === 'zh') return zh
  return ko
}

function Home({ lang = 'ko' }) {
  const t = getTexts(lang)

  return (
    <div className="home">
      {/* HERO 영역 */}
      <section className="home-hero">
        <div className="home-hero-left">
          <div className="home-hero-tag">
            <span>🌐</span>
            {t.tag}
          </div>
          <h1 className="home-hero-title">
            {t.title}
            <span className="home-hero-highlight">{t.highlight}</span>
          </h1>
          <p className="home-hero-sub">{t.sub}</p>
          <ul className="home-hero-bullets">
            {t.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="home-hero-right">
          <div className="home-ocean-card">
            <div className="home-ocean-card-inner">
              <div className="badge">
                <span>🌊</span> Marine Debris x Climate Justice
              </div>
              <h2 className="home-ocean-title">{t.cardTitle}</h2>
              <div className="home-ocean-chip-row">
                <span className="home-chip">Plastic</span>
                <span className="home-chip green">Fishing gear</span>
                <span className="home-chip orange">Styrofoam</span>
              </div>
              <ul className="home-ocean-list">
                {t.cardItems.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 아래 설명 섹션 */}
      <section className="home-section">
        <h2 className="home-section-title">{t.sectionTitle}</h2>
        <p className="home-section-desc">{t.sectionDesc}</p>
        <div className="home-section-grid">
          {t.cards.map((card, idx) => (
            <article key={idx} className="home-section-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

