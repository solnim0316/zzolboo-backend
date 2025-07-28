// 📸 갤러리 관련 API 라우트
import express from 'express';

const router = express.Router();

// 📸 갤러리 이미지 목록 조회
router.get('/', (req, res) => {
  const { category, limit = 20, page = 1 } = req.query;
  
  const galleryImages = [
    {
      id: 1,
      title: '쫄이의 하루',
      description: '쫄이가 코딩하는 모습',
      imageUrl: '/images/gallery/zzol-coding.jpg',
      thumbnailUrl: '/images/gallery/thumbs/zzol-coding-thumb.jpg',
      category: 'zzol',
      tags: ['개발', '일상', '코딩'],
      uploadDate: '2024-01-10T09:30:00Z',
      likes: 234,
      views: 1567
    },
    {
      id: 2,
      title: '부의 점심시간',
      description: '부가 맛있는 점심을 먹는 중',
      imageUrl: '/images/gallery/boo-lunch.jpg',
      thumbnailUrl: '/images/gallery/thumbs/boo-lunch-thumb.jpg',
      category: 'boo',
      tags: ['음식', '일상', '점심'],
      uploadDate: '2024-01-09T12:15:00Z',
      likes: 189,
      views: 1234
    },
    {
      id: 3,
      title: '함께 하는 회의',
      description: '쫄과 부가 함께 아이디어 회의',
      imageUrl: '/images/gallery/together-meeting.jpg',
      thumbnailUrl: '/images/gallery/thumbs/together-meeting-thumb.jpg',
      category: 'together',
      tags: ['회의', '협업', '아이디어'],
      uploadDate: '2024-01-08T14:45:00Z',
      likes: 456,
      views: 2341
    },
    {
      id: 4,
      title: '개발 환경 셋업',
      description: '깔끔하게 정리된 개발 워크스페이스',
      imageUrl: '/images/gallery/workspace-setup.jpg',
      thumbnailUrl: '/images/gallery/thumbs/workspace-setup-thumb.jpg',
      category: 'workspace',
      tags: ['개발환경', '워크스페이스', '셋업'],
      uploadDate: '2024-01-07T10:20:00Z',
      likes: 312,
      views: 1876
    }
  ];

  let filteredImages = galleryImages;
  
  if (category && category !== 'all') {
    filteredImages = filteredImages.filter(img => img.category === category);
  }

  // 페이지네이션
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: {
      images: paginatedImages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredImages.length,
        totalPages: Math.ceil(filteredImages.length / parseInt(limit))
      }
    },
    timestamp: new Date().toISOString()
  });
});

// 🏷️ 갤러리 카테고리 목록
router.get('/categories', (req, res) => {
  const categories = [
    {
      id: 'all',
      name: '전체',
      icon: '🌟',
      count: 156,
      description: '모든 갤러리 이미지'
    },
    {
      id: 'zzol',
      name: '쫄이',
      icon: '🐸',
      count: 45,
      description: '쫄이의 일상과 개발 이야기'
    },
    {
      id: 'boo',
      name: '부',
      icon: '🐰',
      count: 38,
      description: '부의 하루와 취미 생활'
    },
    {
      id: 'together',
      name: '함께',
      icon: '🫶',
      count: 42,
      description: '쫄과 부가 함께하는 순간들'
    },
    {
      id: 'workspace',
      name: '작업공간',
      icon: '💻',
      count: 31,
      description: '개발 환경과 워크스페이스'
    }
  ];

  res.json({
    success: true,
    data: categories,
    timestamp: new Date().toISOString()
  });
});

// 🔍 특정 이미지 상세 조회
router.get('/:imageId', (req, res) => {
  const { imageId } = req.params;
  
  const imageDetail = {
    id: parseInt(imageId),
    title: '쫄이의 하루',
    description: '쫄이가 새로운 테스트 기능을 개발하고 있는 모습입니다. 집중하는 표정이 너무 귀여워요!',
    imageUrl: '/images/gallery/zzol-coding.jpg',
    fullImageUrl: '/images/gallery/full/zzol-coding-full.jpg',
    category: 'zzol',
    tags: ['개발', '일상', '코딩', '집중'],
    uploadDate: '2024-01-10T09:30:00Z',
    likes: 234,
    views: 1567,
    comments: [
      {
        id: 1,
        author: '익명의 방문자',
        content: '쫄이 너무 귀여워요! 😍',
        timestamp: '2024-01-10T10:15:00Z'
      },
      {
        id: 2,
        author: '개발자123',
        content: '저도 저렇게 집중해서 코딩하고 싶어요 ㅠㅠ',
        timestamp: '2024-01-10T11:30:00Z'
      }
    ],
    exifData: {
      camera: 'iPhone 15 Pro',
      lens: '24mm f/1.78',
      iso: 200,
      shutterSpeed: '1/60s',
      aperture: 'f/1.8'
    },
    location: '쫄부월드 본사'
  };

  if (!imageDetail) {
    return res.status(404).json({
      success: false,
      error: '이미지를 찾을 수 없습니다'
    });
  }

  // 조회수 증가
  console.log(`👀 갤러리 이미지 조회: ${imageId}`);

  res.json({
    success: true,
    data: imageDetail,
    timestamp: new Date().toISOString()
  });
});

// ❤️ 이미지 좋아요
router.post('/:imageId/like', (req, res) => {
  const { imageId } = req.params;
  
  // 실제로는 데이터베이스에서 좋아요 수 증가
  const updatedLikes = Math.floor(Math.random() * 1000) + 200;
  
  console.log(`❤️ 이미지 좋아요: ${imageId}`);

  res.json({
    success: true,
    data: {
      imageId: parseInt(imageId),
      likes: updatedLikes,
      message: '좋아요가 추가되었습니다!'
    },
    timestamp: new Date().toISOString()
  });
});

// 💬 이미지 댓글 추가
router.post('/:imageId/comments', (req, res) => {
  const { imageId } = req.params;
  const { author, content } = req.body;
  
  if (!content) {
    return res.status(400).json({
      success: false,
      error: '댓글 내용이 필요합니다'
    });
  }

  const newComment = {
    id: Date.now(),
    author: author || '익명의 방문자',
    content,
    timestamp: new Date().toISOString()
  };

  console.log(`💬 새 댓글 추가: 이미지 ${imageId}`);

  res.status(201).json({
    success: true,
    data: newComment,
    message: '댓글이 성공적으로 추가되었습니다'
  });
});

// 🏷️ 태그별 이미지 검색
router.get('/search/tags', (req, res) => {
  const { tag, limit = 10 } = req.query;
  
  if (!tag) {
    return res.status(400).json({
      success: false,
      error: '검색할 태그를 입력해주세요'
    });
  }

  // 실제로는 데이터베이스에서 태그 검색
  const searchResults = [
    {
      id: 1,
      title: '쫄이의 하루',
      thumbnailUrl: '/images/gallery/thumbs/zzol-coding-thumb.jpg',
      category: 'zzol',
      likes: 234
    },
    {
      id: 5,
      title: '새로운 기능 개발',
      thumbnailUrl: '/images/gallery/thumbs/feature-dev-thumb.jpg',
      category: 'workspace',
      likes: 189
    }
  ].slice(0, parseInt(limit));

  res.json({
    success: true,
    data: {
      tag,
      results: searchResults,
      total: searchResults.length
    },
    timestamp: new Date().toISOString()
  });
});

// 📊 갤러리 통계
router.get('/stats/overview', (req, res) => {
  const stats = {
    totalImages: 156,
    totalViews: 45234,
    totalLikes: 12456,
    totalComments: 3421,
    categoryStats: [
      { category: 'zzol', count: 45, percentage: 28.8 },
      { category: 'boo', count: 38, percentage: 24.4 },
      { category: 'together', count: 42, percentage: 26.9 },
      { category: 'workspace', count: 31, percentage: 19.9 }
    ],
    popularTags: [
      { tag: '개발', count: 67 },
      { tag: '일상', count: 54 },
      { tag: '코딩', count: 43 },
      { tag: '협업', count: 32 }
    ],
    recentActivity: {
      uploads: 12,
      likes: 234,
      comments: 89,
      views: 1567
    }
  };

  res.json({
    success: true,
    data: stats,
    timestamp: new Date().toISOString()
  });
});

export default router;
