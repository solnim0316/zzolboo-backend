// 🚀 쫄부월드 백엔드 API 서버
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 라우터 import
import testRoutes from './routes/tests.js';
import resultRoutes from './routes/results.js';
import analyticsRoutes from './routes/analytics.js';
import galleryRoutes from './routes/gallery.js';

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 📡 미들웨어 설정
app.use(helmet()); // 보안 헤더
app.use(compression()); // Gzip 압축
app.use(morgan('combined')); // 로깅
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'https://zzolbooworld.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 🎯 API 라우트
app.use('/api/tests', testRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/gallery', galleryRoutes);

// 🏠 기본 루트
app.get('/', (req, res) => {
  res.json({
    message: '🎉 쫄부월드 API 서버에 오신 걸 환영합니다!',
    version: '1.0.0',
    endpoints: {
      tests: '/api/tests',
      results: '/api/results',
      analytics: '/api/analytics',
      gallery: '/api/gallery'
    },
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// 📊 헬스체크 엔드포인트
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

// 🚫 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'API 엔드포인트를 찾을 수 없습니다',
    requestedUrl: req.originalUrl,
    availableEndpoints: [
      '/api/tests',
      '/api/results',
      '/api/analytics',
      '/api/gallery'
    ]
  });
});

// 🔥 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error('서버 에러:', err.stack);
  res.status(500).json({
    error: '서버 내부 오류가 발생했습니다',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 🎬 서버 시작
app.listen(PORT, () => {
  console.log(`
🎉 쫄부월드 백엔드 서버가 시작되었습니다!
🌐 서버 주소: http://localhost:${PORT}
📝 API 문서: http://localhost:${PORT}/
⚡ 환경: ${process.env.NODE_ENV || 'development'}
🕐 시작 시간: ${new Date().toLocaleString('ko-KR')}
  `);
});

export default app;
