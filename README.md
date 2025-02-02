# 스마트 중고 거래 서비스

Next.js와 AI를 활용한 스마트한 중고 거래 플랫폼입니다. 상품 등록 시 AI가 이미지를 분석하여 자동으로 설명을 생성하고, 적정 가격을 추천해주며, 챗봇을 통해 사용자 지원을 제공합니다.

## 주요 기능

### 1. 상품 관리
- 상품 등록: 이름, 가격, 이미지 URL, 설명, 태그를 입력하여 상품 등록
- 상품 수정: 등록된 상품의 정보를 수정
- 상품 목록: 등록된 모든 상품을 그리드 형태로 표시
- 상품 상세: 개별 상품의 상세 정보 확인

### 2. AI 기능
- 이미지 분석: 상품 이미지를 AI가 분석하여 자동으로 설명 생성
- 가격 추천: 상품명을 기반으로 적정 거래 가격 추천
- 챗봇 지원: AI 챗봇을 통한 FAQ 및 사용자 지원

### 3. 사용자 상호작용
- 리뷰 시스템: 상품에 대한 리뷰 작성 및 조회
- 태그 기능: 상품 태그를 통한 분류 및 필터링
- 다크 모드: 사용자 선호도에 따른 테마 변경

## 기술 스택

- Frontend: Next.js, TypeScript, Tailwind CSS
- AI 통합: Windsurf AI API
- 상태 관리: Local Storage
- 배포: GitHub Pages

## 시작하기

1. 저장소 클론
```bash
git clone https://github.com/lxuzin/mini-business.git
cd mini-business
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 확인
```
http://localhost:3000
```

## 사용 방법

### 상품 등록
1. 메인 페이지에서 "상품 등록하기" 버튼 클릭
2. 상품 정보 입력:
   - 상품명 (필수)
   - 가격 (필수) - AI 가격 추천 기능 활용 가능
   - 이미지 URL (필수) - 이미지 입력 시 AI가 자동으로 설명 생성
   - 태그 (선택) - 쉼표나 엔터로 구분하여 입력
3. "등록하기" 버튼 클릭

### 상품 검색 및 필터링
- 태그를 클릭하여 해당 태그가 있는 상품만 필터링
- "전체" 버튼을 클릭하여 필터 초기화

### 리뷰 작성
1. 상품 상세 페이지로 이동
2. 하단의 리뷰 섹션에서 리뷰 작성
3. 별점과 함께 리뷰 내용 입력

### 챗봇 사용
- 우측 하단의 챗봇 아이콘 클릭
- 질문 입력 시 AI가 자동으로 응답

### 다크 모드
- 우측 상단의 테마 토글 버튼을 클릭하여 라이트/다크 모드 전환

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

MIT License
