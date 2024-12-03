# WealthTracker - Frontend

<img width="342" alt="image" src="https://github.com/user-attachments/assets/536e423f-cae8-44ef-9621-9d990c5e8f9c">


##### React 기반 가계부 웹 페이지입니다.
##### Styled-components를 활용한 세련된 UI 디자인과, JWT 기반 API 통신으로 안전한 데이터 처리를 지원합니다.




## 프로젝트 페이지별 주요 기능


### - 로그인 
### - 수입/지출 내역
### - 결제 예정
### - 비용
### - 목표
### - 설정



## 프로젝트 구조
📂 WealthTracker-FE
├── 📁 dist/                 # 빌드 결과물 디렉터리
├── 📁 node_modules/         # 설치된 라이브러리 및 의존성
├── 📁 public/               # 정적 파일 디렉터리
│   └── index.html           # 메인 HTML 파일
├── 📁 src/                  # 소스 코드 디렉터리
│   ├── 📁 api/              # API 호출 관련 파일
│   │   ├── api.jsx          # 기본 API 설정 파일
│   │   ├── expendAPI.jsx    # 지출 관련 API
│   │   ├── incomeAPI.jsx    # 수입 관련 API
│   │   └── scheduleAPI.jsx  # 일정 관련 API
│   ├── 📁 assets/           # 이미지 및 리소스
│   │   ├── images/          # 이미지 파일 디렉터리
│   │   └── react.svg        # React 로고 파일
│   ├── 📁 components/       # 재사용 가능한 컴포넌트
│   │   ├── 📁 common/       # 공통 컴포넌트
│   │   │   ├── CircleGraph.jsx
│   │   │   ├── DailyGraph.jsx
│   │   │   ├── Error.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingSpinners.jsx
│   │   │   └── SideMenu.jsx
│   │   ├── 📁 main/         # 메인 페이지 컴포넌트
│   │   │   ├── ConsumptionReport.jsx
│   │   │   ├── ConsumptionStatistics.jsx
│   │   │   ├── CurrentConsumptionList.jsx
│   │   │   ├── PaymentScheduled.jsx
│   │   │   └── SavingsGoal.jsx
│   │   └── 📁 transactions/ # 트랜잭션 관련 컴포넌트
│   │       ├── Pagination.jsx
│   │       ├── Tabs.jsx
│   │       ├── TransactionList.jsx
│   │       ├── TransactionModal.jsx
│   │       ├── BackGround.jsx
│   │       ├── Calendar.jsx
│   │       ├── GoalModal.jsx
│   │       ├── Graph.jsx
│   │       ├── Layout.jsx
│   │       ├── Login.jsx
│   │       ├── ScheduledModal.jsx
│   │       └── SideMenu.jsx
│   ├── 📁 hooks/            # 커스텀 훅
│   │   ├── useFetch.jsx
│   │   ├── useFetchSch.jsx
│   │   └── useFetchTrans.jsx
│   ├── 📁 pages/            # 페이지별 컴포넌트
│   │   ├── ErrorPage.jsx
│   │   ├── Expense.jsx
│   │   ├── FindPassword.jsx
│   │   ├── Goals.jsx
│   │   ├── Login.jsx
│   │   ├── Main.jsx
│   │   ├── ScheduledPayments.jsx
│   │   ├── Settings.jsx
│   │   ├── Signup.jsx
│   │   └── Transactions.jsx
│   ├── 📁 utils/            # 유틸리티 함수
│   │   └── formatters.js    # 데이터 포매팅 함수
│   ├── App.css              # 전역 CSS 파일
│   ├── App.jsx              # 메인 애플리케이션 컴포넌트
│   ├── GlobalStyle.js       # 글로벌 스타일 정의
│   ├── index.css            # 인덱스 스타일 파일
│   ├── index.jsx            # 애플리케이션 엔트리 파일
│   └── theme.js             # 테마 설정
├── 📄 .env                  # 환경 변수 설정
├── 📄 .eslint.config.js     # ESLint 설정 파일
├── 📄 package.json          # 프로젝트 및 의존성 설정
├── 📄 vite.config.js        # Vite 설정 파일
└── 📄 yarn.lock             # Yarn 종속성 잠금 파일




