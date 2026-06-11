# 지금 뭐 하고 싶어?

막막한 목표를 **지금 당장 할 수 있는 1개의 행동**으로 쪼개주는 AI 태스크 분해 앱.

"운동 시작해야지"처럼 추상적인 목표를 입력하면, AI가 5분 안에 할 수 있는 구체적인 단계로 나눠준다. 못 하겠으면 더 작게, 할 수 있으면 다음으로. 그게 전부다.

---

## 핵심 흐름

```
목표 입력 → AI 분해 (최대 6단계) → 1개씩 실행
                                        ↓
                               완료 → 다음 단계
                               실패 → AI 재분해 (최대 4단계, 2분 단위로 더 잘게)
                                        ↓
                               모두 완료 → 🎉
```

---

## 기능

### 목표 분해 (`/api/decompose`)
- 입력한 목표를 Gemini 2.0 Flash가 최대 6단계로 분해
- 각 단계는 5분 이내 완료 가능한 구체적 행동으로 생성

### 실시간 진행 (`CurrentTask`)
- 한 번에 하나의 태스크만 표시
- 상단 프로그레스 바로 전체 진행도 확인

### 실패 시 재분해 (`/api/redecompose`)
- "못 했어" 버튼을 누르면 해당 태스크를 2분 단위 최대 4단계로 더 잘게 쪼개줌
- 쪼개진 태스크들이 기존 목록에 삽입되어 흐름 유지

### 완료
- 모든 태스크 완료 시 축하 화면과 함께 새 목표 시작 가능

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| AI | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| 스타일 | Tailwind CSS v4 |
| 언어 | TypeScript |

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Gemini API 키는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료로 발급받을 수 있다.

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 접속

---

## 프로젝트 구조

```
app/
├── page.tsx                  # 메인 페이지 (상태 관리, 화면 전환)
├── layout.tsx
├── globals.css
└── api/
    ├── decompose/route.ts    # 목표 → 태스크 분해 API
    └── redecompose/route.ts  # 실패 태스크 → 재분해 API

components/
├── GoalInput.tsx             # 목표 입력 화면
├── CurrentTask.tsx           # 현재 태스크 실행 화면
└── TaskComplete.tsx          # 완료 화면
```

---

## 빌드 및 배포

```bash
npm run build
npm run start
```

Vercel에 배포할 경우 환경변수 `GEMINI_API_KEY`를 프로젝트 설정에서 추가해야 한다.

**프로덕션 URL:** https://vibe-coding-one-self.vercel.app

---

<details>
<summary>작업 내역</summary>

### 2026-06-12

**디자인 리뉴얼 (화이트 + 다크 네이비)**
- 배경 화이트, 포인트 컬러 `#0d1b3e` (다크 네이비)로 전면 교체
- GoalInput: 브랜드 마크, 포커스 글로우 인풋, 예시 칩 hover 개선
- CurrentTask: 2px 네이비 프로그레스 바, 태스크 카드 (`#f8f9fc` 서피스), 힌트 문구 추가
- TaskComplete: SVG 체크 아이콘 (이모지 제거), 클린 계층 구조
- `lang="ko"` 설정

**에러 핸들링 추가**
- 목표 분해 API 실패 시 에러 메시지 노출 (기존 무음 실패)
- 재분해 API 실패 시 에러 메시지 노출
- 네트워크 오류 구분 처리

**보안 강화**
- 입력 길이 제한: goal 500자, task 200자, description 500자
- 입력 타입 검증: 빈 값 및 string 타입 체크
- AI 응답 구조 검증: `isValidTaskArray()` 도입
- 출력 화이트리스트: id/title/description만 반환, 나머지 제거
- 에러 정보 비노출: raw error 대신 한국어 메시지 반환
- `req.json()` 파싱 실패 안전 처리

**Vercel 배포**
- GitHub (`ozzi1228/vibe-coding`) 연결 후 프로덕션 배포 완료
- 프로덕션 URL: https://vibe-coding-one-self.vercel.app
- 환경변수 `GEMINI_API_KEY` Vercel 대시보드에서 등록

</details>
