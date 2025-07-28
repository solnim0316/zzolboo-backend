// 🎯 테스트 결과 관련 API 라우트
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// 📝 테스트 결과 저장
router.post('/', (req, res) => {
  const { testId, answers, userInfo, result } = req.body;
  
  // 유효성 검사
  if (!testId || !answers || !result) {
    return res.status(400).json({
      success: false,
      error: '필수 필드가 누락되었습니다',
      required: ['testId', 'answers', 'result']
    });
  }

  // 결과 저장 (실제로는 데이터베이스에 저장)
  const savedResult = {
    id: uuidv4(),
    testId,
    answers,
    userInfo: userInfo || {},
    result,
    timestamp: new Date().toISOString(),
    shareUrl: `https://zzolboo.com/share/${uuidv4()}`
  };

  console.log('🎯 테스트 결과 저장:', {
    testId,
    resultType: result.type,
    timestamp: savedResult.timestamp
  });

  res.status(201).json({
    success: true,
    data: savedResult,
    message: '테스트 결과가 성공적으로 저장되었습니다'
  });
});

// 🔗 공유용 결과 조회
router.get('/share/:shareId', (req, res) => {
  const { shareId } = req.params;
  
  // 실제로는 데이터베이스에서 조회
  const sharedResult = {
    id: shareId,
    testInfo: {
      title: '고양이 MBTI 테스트',
      emoji: '🐱'
    },
    result: {
      type: 'ENFP',
      name: '활발한 장난꾸러기 고양이',
      description: '호기심 많고 에너지 넘치는 당신! 새로운 것을 탐험하는 걸 좋아하고...',
      image: '/images/cat-enfp.jpg',
      traits: ['호기심 많음', '사교적', '활발함'],
      compatibility: ['INFJ', 'ISFJ']
    },
    userInfo: {
      name: '익명',
      timestamp: '2024-01-15T10:30:00Z'
    },
    shareCount: 42
  };

  if (!sharedResult) {
    return res.status(404).json({
      success: false,
      error: '공유 결과를 찾을 수 없습니다'
    });
  }

  // 조회수 증가 (실제로는 데이터베이스 업데이트)
  console.log('👀 공유 결과 조회:', shareId);

  res.json({
    success: true,
    data: sharedResult,
    timestamp: new Date().toISOString()
  });
});

// 📊 결과 통계 조회
router.get('/stats/:testId', (req, res) => {
  const { testId } = req.params;
  
  // 실제로는 데이터베이스에서 통계 계산
  const resultStats = {
    testId,
    totalResults: 15420,
    resultDistribution: [
      { type: 'ENFP', count: 3624, percentage: 23.5 },
      { type: 'ISFJ', count: 2806, percentage: 18.2 },
      { type: 'INFP', count: 2421, percentage: 15.7 },
      { type: 'ESTJ', count: 1851, percentage: 12.0 },
      { type: 'INTJ', count: 1542, percentage: 10.0 },
      { type: 'Others', count: 3176, percentage: 20.6 }
    ],
    popularityTrend: [
      { date: '2024-01-01', count: 45 },
      { date: '2024-01-02', count: 67 },
      { date: '2024-01-03', count: 89 }
    ]
  };

  res.json({
    success: true,
    data: resultStats,
    timestamp: new Date().toISOString()
  });
});

// 🎭 인기 결과 순위
router.get('/popular/:testId', (req, res) => {
  const { testId } = req.params;
  const { limit = 10 } = req.query;
  
  const popularResults = [
    {
      type: 'ENFP',
      name: '활발한 장난꾸러기 고양이',
      count: 3624,
      percentage: 23.5,
      emoji: '😸'
    },
    {
      type: 'ISFJ',
      name: '다정한 돌봄이 고양이',
      count: 2806,
      percentage: 18.2,
      emoji: '😺'
    },
    {
      type: 'INFP',
      name: '예술가 고양이',
      count: 2421,
      percentage: 15.7,
      emoji: '🎨'
    }
  ].slice(0, parseInt(limit));

  res.json({
    success: true,
    data: popularResults,
    testId,
    limit: parseInt(limit),
    timestamp: new Date().toISOString()
  });
});

// 🔄 결과 재계산
router.post('/recalculate', (req, res) => {
  const { testId, answers } = req.body;
  
  if (!testId || !answers) {
    return res.status(400).json({
      success: false,
      error: '테스트 ID와 답변이 필요합니다'
    });
  }

  // 실제 결과 계산 로직
  const calculatedResult = {
    type: 'ENFP',
    name: '활발한 장난꾸러기 고양이',
    description: '호기심 많고 에너지 넘치는 당신!',
    image: '/images/cat-enfp.jpg',
    score: {
      E: 75, I: 25,
      N: 80, S: 20,
      F: 70, T: 30,
      P: 85, J: 15
    }
  };

  res.json({
    success: true,
    data: calculatedResult,
    testId,
    timestamp: new Date().toISOString()
  });
});

export default router;
