// 📊 분석 및 통계 관련 API 라우트
import express from 'express';

const router = express.Router();

// 📈 전체 대시보드 통계
router.get('/dashboard', (req, res) => {
  const dashboardStats = {
    overview: {
      totalTests: 4,
      totalParticipants: 47832,
      weeklyParticipants: 3421,
      totalShares: 12456
    },
    testPerformance: [
      {
        testId: 'cat-test',
        title: '고양이 MBTI 테스트',
        participants: 15420,
        completionRate: 89.5,
        averageTime: 4.2,
        shares: 5632
      },
      {
        testId: 'dinosaur-test',
        title: '공룡 MBTI 테스트',
        participants: 12305,
        completionRate: 87.3,
        averageTime: 4.8,
        shares: 3214
      },
      {
        testId: 'family-mbti',
        title: '우리 엄마 MBTI 테스트',
        participants: 11287,
        completionRate: 92.1,
        averageTime: 6.5,
        shares: 2156
      },
      {
        testId: 'food-test',
        title: '음식 취향 테스트',
        participants: 8820,
        completionRate: 85.7,
        averageTime: 3.9,
        shares: 1454
      }
    ],
    popularityTrend: [
      { date: '2024-01-08', participants: 1234 },
      { date: '2024-01-09', participants: 1456 },
      { date: '2024-01-10', participants: 1678 },
      { date: '2024-01-11', participants: 1532 },
      { date: '2024-01-12', participants: 1789 },
      { date: '2024-01-13', participants: 1654 },
      { date: '2024-01-14', participants: 1876 }
    ]
  };

  res.json({
    success: true,
    data: dashboardStats,
    timestamp: new Date().toISOString()
  });
});

// 📱 사용자 행동 분석
router.get('/user-behavior', (req, res) => {
  const { period = '7d' } = req.query;
  
  const userBehavior = {
    period,
    deviceStats: {
      mobile: { count: 28459, percentage: 67.2 },
      desktop: { count: 12873, percentage: 30.4 },
      tablet: { count: 1015, percentage: 2.4 }
    },
    browserStats: {
      chrome: { count: 31245, percentage: 73.8 },
      safari: { count: 6324, percentage: 14.9 },
      firefox: { count: 3157, percentage: 7.5 },
      edge: { count: 1621, percentage: 3.8 }
    },
    timeDistribution: [
      { hour: 0, participants: 145 },
      { hour: 1, participants: 89 },
      { hour: 2, participants: 67 },
      // ... 24시간 데이터
      { hour: 14, participants: 1234 },
      { hour: 15, participants: 1456 },
      { hour: 20, participants: 1678 },
      { hour: 21, participants: 1532 },
      { hour: 22, participants: 1234 },
      { hour: 23, participants: 987 }
    ],
    completionFunnel: {
      started: 52341,
      completed: 47832,
      shared: 12456,
      conversionRate: {
        completion: 91.4,
        sharing: 26.0
      }
    }
  };

  res.json({
    success: true,
    data: userBehavior,
    timestamp: new Date().toISOString()
  });
});

// 🏆 테스트별 상세 분석
router.get('/test/:testId', (req, res) => {
  const { testId } = req.params;
  const { startDate, endDate } = req.query;
  
  const testAnalytics = {
    testId,
    period: { startDate, endDate },
    participantFlow: {
      intro: 15420,
      question1: 15245,
      question5: 14567,
      question10: 13892,
      completed: 13205,
      dropoffRate: 14.4
    },
    questionAnalytics: [
      {
        questionId: 1,
        question: '새로운 환경에 가면?',
        answerDistribution: [
          { option: '구석에 숨어서 상황 파악', count: 7234, percentage: 54.8 },
          { option: '이곳저곳 탐험하며 돌아다님', count: 5971, percentage: 45.2 }
        ],
        averageTime: 8.2
      }
      // ... 더 많은 질문 분석
    ],
    resultDistribution: [
      { type: 'ENFP', count: 3105, percentage: 23.5 },
      { type: 'ISFJ', count: 2403, percentage: 18.2 },
      { type: 'INFP', count: 2073, percentage: 15.7 }
    ],
    shareAnalytics: {
      totalShares: 3421,
      platforms: {
        kakaotalk: 1567,
        instagram: 987,
        facebook: 543,
        twitter: 324
      }
    }
  };

  res.json({
    success: true,
    data: testAnalytics,
    timestamp: new Date().toISOString()
  });
});

// 📊 실시간 통계
router.get('/realtime', (req, res) => {
  const realtimeStats = {
    currentUsers: 234,
    activeTests: [
      { testId: 'cat-test', activeUsers: 89 },
      { testId: 'dinosaur-test', activeUsers: 67 },
      { testId: 'family-mbti', activeUsers: 45 },
      { testId: 'food-test', activeUsers: 33 }
    ],
    recentCompletions: [
      {
        testId: 'cat-test',
        result: 'ENFP',
        timestamp: new Date(Date.now() - 1000 * 30).toISOString()
      },
      {
        testId: 'dinosaur-test',
        result: 'ISFJ',
        timestamp: new Date(Date.now() - 1000 * 45).toISOString()
      }
    ],
    serverMetrics: {
      responseTime: 145,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: Math.random() * 100
    }
  };

  res.json({
    success: true,
    data: realtimeStats,
    timestamp: new Date().toISOString()
  });
});

// 🎯 성과 지표 (KPI)
router.get('/kpi', (req, res) => {
  const { period = '30d' } = req.query;
  
  const kpiMetrics = {
    period,
    metrics: {
      dailyActiveUsers: {
        current: 3421,
        previous: 3156,
        change: 8.4
      },
      completionRate: {
        current: 89.5,
        previous: 87.2,
        change: 2.6
      },
      averageSessionTime: {
        current: 4.2,
        previous: 4.0,
        change: 5.0
      },
      shareRate: {
        current: 26.0,
        previous: 23.5,
        change: 10.6
      },
      userRetention: {
        day1: 68.5,
        day7: 24.3,
        day30: 12.1
      }
    },
    goals: {
      monthlyParticipants: {
        target: 50000,
        current: 47832,
        progress: 95.7
      },
      completionRate: {
        target: 90.0,
        current: 89.5,
        progress: 99.4
      }
    }
  };

  res.json({
    success: true,
    data: kpiMetrics,
    timestamp: new Date().toISOString()
  });
});

export default router;
