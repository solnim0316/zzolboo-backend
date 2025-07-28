// 🧪 테스트 관련 API 라우트
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// 🏷️ 모든 테스트 목록 조회
router.get('/', (req, res) => {
  const tests = [
    {
      id: 'cat-test',
      title: '고양이 MBTI 테스트',
      description: '고양이가 되어버린 나, 나는 어떤 성격의 고양이일까?',
      emoji: '🐱',
      category: 'mbti',
      tags: ['동물', 'MBTI', '성격'],
      isThemed: true,
      difficulty: 'easy',
      estimatedTime: 5,
      featured: true
    },
    {
      id: 'dinosaur-test',
      title: '공룡 MBTI 테스트',
      description: '나는 어떤 공룡과 닮았을까? 나만의 공룡 찾기!',
      emoji: '🦕',
      category: 'mbti',
      tags: ['동물', 'MBTI', '성격'],
      isThemed: true,
      difficulty: 'easy',
      estimatedTime: 5,
      featured: false
    },
    {
      id: 'family-mbti',
      title: '우리 엄마 MBTI 테스트',
      description: '내가 생각하는 우리 엄마는 어떤 성격일까요?',
      emoji: '👩‍👧‍👦',
      category: 'family',
      tags: ['가족', 'MBTI', '관계'],
      isThemed: false,
      difficulty: 'medium',
      estimatedTime: 7,
      featured: false
    },
    {
      id: 'food-test',
      title: '음식 취향 테스트',
      description: '나의 음식 취향으로 알아보는 성격 유형',
      emoji: '🍽️',
      category: 'lifestyle',
      tags: ['음식', '취향', '라이프스타일'],
      isThemed: false,
      difficulty: 'easy',
      estimatedTime: 4,
      featured: false
    }
  ];

  const { category, tag, featured } = req.query;
  
  let filteredTests = tests;
  
  if (category) {
    filteredTests = filteredTests.filter(test => test.category === category);
  }
  
  if (tag) {
    filteredTests = filteredTests.filter(test => 
      test.tags.some(testTag => testTag.toLowerCase().includes(tag.toLowerCase()))
    );
  }
  
  if (featured === 'true') {
    filteredTests = filteredTests.filter(test => test.featured);
  }

  res.json({
    success: true,
    data: filteredTests,
    total: filteredTests.length,
    timestamp: new Date().toISOString()
  });
});

// 🎯 특정 테스트 상세 조회
router.get('/:testId', (req, res) => {
  const { testId } = req.params;
  
  // 실제로는 데이터베이스에서 조회
  const testDetails = {
    'cat-test': {
      id: 'cat-test',
      title: '고양이 MBTI 테스트',
      description: '고양이가 되어버린 나, 나는 어떤 성격의 고양이일까?',
      emoji: '🐱',
      category: 'mbti',
      questions: [
        {
          id: 1,
          question: '새로운 환경에 가면?',
          options: [
            { text: '구석에 숨어서 상황 파악', type: 'I' },
            { text: '이곳저곳 탐험하며 돌아다님', type: 'E' }
          ]
        }
        // ... 더 많은 질문들
      ],
      results: [
        {
          type: 'ENFP',
          name: '활발한 장난꾸러기 고양이',
          description: '호기심 많고 에너지 넘치는 당신!',
          image: '/images/cat-enfp.jpg'
        }
        // ... 더 많은 결과들
      ]
    }
  };

  const test = testDetails[testId];
  
  if (!test) {
    return res.status(404).json({
      success: false,
      error: '테스트를 찾을 수 없습니다',
      testId
    });
  }

  res.json({
    success: true,
    data: test,
    timestamp: new Date().toISOString()
  });
});

// 📊 테스트 통계 조회
router.get('/:testId/stats', (req, res) => {
  const { testId } = req.params;
  
  // 실제로는 데이터베이스에서 조회
  const stats = {
    totalParticipants: 15420,
    weeklyParticipants: 1234,
    popularResults: [
      { type: 'ENFP', percentage: 23.5 },
      { type: 'ISFJ', percentage: 18.2 },
      { type: 'INFP', percentage: 15.7 }
    ],
    averageCompletionTime: 4.2,
    completionRate: 89.5
  };

  res.json({
    success: true,
    data: stats,
    testId,
    timestamp: new Date().toISOString()
  });
});

// 🎲 랜덤 테스트 추천
router.get('/random/recommendation', (req, res) => {
  const randomTests = [
    {
      id: 'cat-test',
      title: '고양이 MBTI 테스트',
      emoji: '🐱',
      reason: '오늘의 추천! 가장 인기 있는 테스트예요'
    },
    {
      id: 'dinosaur-test',
      title: '공룡 MBTI 테스트',
      emoji: '🦕',
      reason: '새로 추가된 테스트를 체험해보세요!'
    }
  ];

  const randomTest = randomTests[Math.floor(Math.random() * randomTests.length)];

  res.json({
    success: true,
    data: randomTest,
    timestamp: new Date().toISOString()
  });
});

export default router;
