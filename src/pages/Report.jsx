// src/pages/Report.jsx
function Report() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>인사이트 리포트 (Weekly Report)</h1>
      <p>
        EAODN에 누적된 데이터를 바탕으로 주간/월간 인사이트를 자동으로 만들어주는 페이지입니다.
        현재는 예시 데이터를 기준으로 레이아웃만 구성해 둔 상태입니다.
      </p>

      <section style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}>
          <h3>WEEK</h3>
          <p>2025-01-27 ~ 2025-02-02</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}>
          <h3>DATA POINTS</h3>
          <p>74 records</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}>
          <h3>PARTICIPANTS</h3>
          <p>32 students</p>
        </div>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>국가별 요약</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', flex: 1 }}>
            <h3>South Korea</h3>
            <p>기록 지점: 20곳</p>
            <p>가장 많은 쓰레기: Plastic bottles</p>
            <p>핫스팟: 서울, 부산 해운대, 인천 송도</p>
          </div>
          <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', flex: 1 }}>
            <h3>Japan</h3>
            <p>기록 지점: 16곳</p>
            <p>가장 많은 쓰레기: Styrofoam</p>
            <p>핫스팟: 나가사키, 후쿠오카 만</p>
          </div>
          <div style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', flex: 1 }}>
            <h3>China</h3>
            <p>기록 지점: 18곳</p>
            <p>가장 많은 쓰레기: Fishing gear & ropes</p>
            <p>핫스팟: 칭다오 해안, 상해 </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '24px' }}>
        <h2>이번 주 인사이트 요약</h2>
        <p>
          이번 주에는 세 나라 모두에서 플라스틱 병과 스티로폼 비중이 높게 나타났습니다.
          특히 한국과 일본의 주요 해수욕장 주변에서 일회용 음료 용기와 포장재가 집중적으로 발견되었습니다.
          중국 칭다오 인근에서는 어업 활동과 연관된 로프·그물류 비중이 높아,
          해양 쓰레기 관리에서 어업 부문의 역할이 중요함을 보여줍니다.
        </p>
      </section>
    </div>
  )
}

export default Report
