// src/data/initialPosts.js
// EAODN 커뮤니티 기본 예시 기록들
// 댓글은 original + translations 구조로 저장 (번역 확장용)

export const initialPosts = [
  // 한국
  {
    id: 1,
    country: 'South Korea',
    location: 'Busan Haeundae',
    title: '부산 해운대 플로깅',
    imageUrl: '',
    trashType: 'Plastic bottles',
    quantity: 120,
    notes: 'PET 병과 일회용 컵이 대부분이었고, 관광객 밀집 구간에서 특히 많았다.',
    comments: [
      {
        id: 101,
        original: '고생 많았어요!',
        createdAt: new Date().toISOString(),
        likes: 2,
        translations: {
          ko: '고생 많았어요!',
          ja: 'お疲れさまでした！',
          zh: '辛苦了！',
        },
      },
      {
        id: 102,
        original: '한국-일본 공동 플로깅도 하면 좋겠다.',
        createdAt: new Date().toISOString(),
        likes: 1,
        translations: {
          ko: '한국-일본 공동 플로깅도 하면 좋겠다.',
          ja: '韓日共同でのプラゴミ拾いもできたらいいですね。',
          zh: '如果能开展韩日联合捡垃圾活动就更好了。',
        },
      },
    ],
  },
  {
    id: 2,
    country: 'South Korea',
    location: 'Seoul Hangang',
    title: '서울 한강 둔치 플로깅',
    imageUrl: '',
    trashType: 'Others',
    quantity: 60,
    notes: '도시 생활 쓰레기(포장재, 일회용 용기)가 중심이었다.',
    comments: [],
  },

  // 일본
  {
    id: 3,
    country: 'Japan',
    location: 'Nagasaki Beach',
    title: '나가사키 해변 조사',
    imageUrl: '',
    trashType: 'Styrofoam & foamed plastics',
    quantity: 45,
    notes: '스티로폼 부표와 포장재 조각이 많이 발견되었다.',
    comments: [
      {
        id: 201,
        original: 'EAODN에 바로 업로드 예정!',
        createdAt: new Date().toISOString(),
        likes: 0,
        translations: {
          ko: 'EAODN에 바로 업로드 예정!',
          ja: 'EAODN にすぐアップロードする予定です！',
          zh: '马上上传到 EAODN！',
        },
      },
    ],
  },
  {
    id: 4,
    country: 'Japan',
    location: 'Fukuoka Hakata Bay',
    title: '후쿠오카 하카타만 플로깅',
    imageUrl: '',
    trashType: 'Plastic bags & packaging',
    quantity: 70,
    notes: '',
    comments: [],
  },

  // 중국
  {
    id: 5,
    country: 'China',
    location: 'Qingdao Coast',
    title: '칭다오 해안 어구 조사',
    imageUrl: '',
    trashType: 'Fishing gear & ropes',
    quantity: 35,
    notes: '어업 활동과 연관된 로프·그물류가 많은 비중을 차지했다.',
    comments: [
      {
        id: 301,
        original: '어업 협력 필요성 공감합니다.',
        createdAt: new Date().toISOString(),
        likes: 0,
        translations: {
          ko: '어업 협력 필요성 공감합니다.',
          ja: '漁業協力の必要性に共感します。',
          zh: '非常认同需要加强渔业合作。',
        },
      },
    ],
  },
  {
    id: 6,
    country: 'China',
    location: 'Shanghai Coast',
    title: '상하이 연안 조사',
    imageUrl: '',
    trashType: 'Plastic bags & packaging',
    quantity: 90,
    notes: '',
    comments: [],
  },
]
