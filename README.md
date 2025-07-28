# 🚀 쫄부월드 백엔드 API 서버

쫄부월드의 모든 테스트와 기능을 지원하는 백엔드 API 서버입니다.

## 📋 목차

- [시작하기](#시작하기)
- [API 엔드포인트](#api-엔드포인트)
- [프로젝트 구조](#프로젝트-구조)
- [환경 설정](#환경-설정)
- [개발 가이드](#개발-가이드)

## 🚀 시작하기

### 1. 의존성 설치
```bash
cd backend
npm install
```

### 2. 환경 설정
`.env` 파일에서 필요한 환경변수를 설정하세요.

### 3. 서버 실행
```bash
# 개발 모드 (nodemon 사용)
npm run dev

# 프로덕션 모드
npm start
```

서버가 성공적으로 실행되면 `http://localhost:3001`에서 접근할 수 있습니다.

## 📡 API 엔드포인트

### 🏠 기본 정보
- `GET /` - API 서버 정보
- `GET /health` - 헬스체크

### 🧪 테스트 관련
- `GET /api/tests` - 모든 테스트 목록 조회
- `GET /api/tests/:testId` - 특정 테스트 상세 조회
- `GET /api/tests/:testId/stats` - 테스트 통계
- `GET /api/tests/random/recommendation` - 랜덤 테스트 추천

### 🎯 결과 관련
- `POST /api/results` - 테스트 결과 저장
- `GET /api/results/share/:shareId` - 공유용 결과 조회
- `GET /api/results/stats/:testId` - 결과 통계
- `GET /api/results/popular/:testId` - 인기 결과 순위
- `POST /api/results/recalculate` - 결과 재계산

### 📊 분석 및 통계
- `GET /api/analytics/dashboard` - 전체 대시보드 통계
- `GET /api/analytics/user-behavior` - 사용자 행동 분석
- `GET /api/analytics/test/:testId` - 테스트별 상세 분석
- `GET /api/analytics/realtime` - 실시간 통계
- `GET /api/analytics/kpi` - 성과 지표

### 📸 갤러리
- `GET /api/gallery` - 갤러리 이미지 목록
- `GET /api/gallery/categories` - 갤러리 카테고리
- `GET /api/gallery/:imageId` - 특정 이미지 상세 조회
- `POST /api/gallery/:imageId/like` - 이미지 좋아요
- `POST /api/gallery/:imageId/comments` - 이미지 댓글 추가
- `GET /api/gallery/search/tags` - 태그별 이미지 검색
- `GET /api/gallery/stats/overview` - 갤러리 통계

## 📁 프로젝트 구조

```
backend/
├── server.js              # 메인 서버 파일
├── package.json           # 패키지 설정
├── .env                   # 환경 변수
├── README.md             # 이 파일
└── routes/               # API 라우트
    ├── tests.js          # 테스트 관련 API
    ├── results.js        # 결과 관련 API
    ├── analytics.js      # 분석 및 통계 API
    └── gallery.js        # 갤러리 관련 API
```

## 🔧 환경 설정

### 필수 환경 변수
- `PORT` - 서버 포트 (기본값: 3001)
- `NODE_ENV` - 실행 환경 (development/production)
- `FRONTEND_URL` - 프론트엔드 URL (CORS 설정용)

### 선택 환경 변수
- 데이터베이스 연결 정보
- 외부 API 키
- JWT 설정
- 파일 업로드 설정

## 🛠 개발 가이드

### 새로운 API 엔드포인트 추가

1. `routes/` 폴더에 새로운 라우트 파일 생성
2. Express Router를 사용하여 엔드포인트 정의
3. `server.js`에서 라우트 등록

예시:
```javascript
// routes/example.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export default router;
```

### 에러 처리

모든 API는 일관된 응답 형식을 사용합니다:

```javascript
// 성공 응답
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00.000Z"
}

// 에러 응답
{
  "success": false,
  "error": "에러 메시지",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 로깅

Morgan을 사용하여 HTTP 요청을 로깅합니다. 추가적인 로깅이 필요한 경우 `console.log`를 사용하세요.

## 🔐 보안

- **Helmet**: 보안 헤더 설정
- **CORS**: 크로스 오리진 요청 제어
- **Rate Limiting**: 추후 추가 예정
- **Input Validation**: 추후 추가 예정

## 📈 모니터링

- `/health` 엔드포인트로 서버 상태 확인
- 메모리 사용량 및 업타임 모니터링
- 실시간 통계 API 제공

## 🚀 배포

### 로컬 배포
```bash
npm start
```

### Docker (추후 추가 예정)
```bash
docker build -t zzolboo-backend .
docker run -p 3001:3001 zzolboo-backend
```

## 📞 지원

문제가 발생하면 GitHub Issues를 통해 문의해주세요.

---

Made with ❤️ by 쫄부팀
