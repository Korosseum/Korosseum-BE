# 🔥 사이버 VS 토론 플랫폼

React + Vite 기반의 한국어 VS 스타일 토론 플랫폼입니다.

## ✨ 주요 기능

- 🏟️ **실시간 토론방**: 팀별 실시간 채팅과 논증 시스템
- 🗳️ **투표 시스템**: 논증에 대한 투표와 채택 기능
- 📊 **실시간 통계**: 참여자 현황과 토론 진행 상황 시각화
- 👤 **마이페이지**: 개인 토론 기록과 통계 관리
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 사용 경험
- ✨ **아름다운 애니메이션**: Framer Motion을 활용한 부드러운 인터랙션

## 🛠️ 기술 스택

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Charts**: Recharts

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/cyber-vs-debate-platform.git
cd cyber-vs-debate-platform

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 프리뷰
npm run preview
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📁 프로젝트 구조

```
├── src/                   # 소스 코드 (App.tsx)
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── LandingPage.tsx   # 랜딩 페이지
│   ├── HomePage.tsx      # 메인 홈페이지
│   ├── PositionSelection.tsx # 포지션 선택
│   ├── DebateRoom.tsx    # 토론방
│   ├── MyPage.tsx        # 마이페이지
│   └── ...              # 기타 컴포넌트들
├── styles/               # 스타일 파일
├── lib/                  # 유틸리티 함수
└── public/               # 정적 파일
```

## 🎨 디자인 시스템

- **Side A**: `#FF4D4D` (빨간색)
- **Side B**: `#4D79FF` (파란색)  
- **Neutral**: `#CCCCCC` (회색)
- **Font**: Inter

## 📱 페이지 구조

- **랜딩 페이지**: 플랫폼 소개 및 기능 안내 (애니메이션 포함)
- **홈 페이지**: 활성/종료된 토론 목록 및 통계
- **포지션 선택**: A팀/B팀 선택 페이지
- **토론방**: 실시간 채팅, 논증 작성, 투표 시스템
- **마이페이지**: 개인 토론 기록 및 통계

## 🌟 주요 특징

### 완전한 상태 관리
- React useState를 활용한 페이지 라우팅
- 사용자 세션 및 토론 참여 상태 관리
- 토론 데이터 실시간 업데이트

### 애니메이션
- Framer Motion을 활용한 부드러운 페이지 전환
- 스크롤 기반 애니메이션
- 인터랙티브한 호버 효과
- 카운터 애니메이션

### 반응형 디자인
- 모바일 우선 디자인
- Tailwind CSS를 활용한 반응형 레이아웃
- 다양한 화면 크기 지원

### 토론 기능
- **토론 참여하기**: 관심있는 토론에 즉시 참여
- **새 토론 만들기**: 사용자가 새로운 토론 주제 생성
- **실시간 채팅**: 팀별 전용 채팅방
- **논증 시스템**: 논리적 근거 제시 및 평가
- **투표 & 채택**: 베스트 논증 선정

## 🎮 사용 방법

1. **시작하기**: 랜딩 페이지에서 "지금 시작하기" 클릭
2. **토론 선택**: 홈페이지에서 관심있는 토론 선택
3. **팀 선택**: A팀 또는 B팀 중 지지하는 쪽 선택
4. **토론 참여**: 팀 채팅방에서 토론하고 논증 작성
5. **투표하기**: 다른 사람들의 논증에 투표

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/cyber-vs-debate-platform](https://github.com/your-username/cyber-vs-debate-platform)

---

Built with ❤️ using React, Vite, TypeScript & Tailwind CSS