# Next.js 프로젝트 GitHub Pages 배포 문제 해결하기

## 1. 문제 상황

Next.js로 개발한 중고거래 웹 애플리케이션을 GitHub Pages에 배포하려고 했지만, 여러 가지 문제에 직면했습니다.

### 1.1. 첫 번째 시도: GitHub Actions를 이용한 자동 배포

처음에는 GitHub Actions를 사용하여 자동 배포를 시도했습니다.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          branch: gh-pages
```

하지만 이 방법은 다음과 같은 문제에 직면했습니다:
1. gh-pages 브랜치가 생성되지 않음
2. 배포 후 404 에러 발생

### 1.2. 두 번째 시도: 정적 내보내기(Static Export)

Next.js의 정적 내보내기 기능을 사용하여 시도했습니다.

```javascript
// next.config.js
const nextConfig = {
    output: 'export',
    basePath: '/mini-business',
    images: {
        unoptimized: true,
    },
}
```

하지만 다음과 같은 오류가 발생했습니다:
```
Error: Page "/products/[id]/edit" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
```

### 1.3. 세 번째 시도: generateStaticParams 추가

동적 라우팅을 사용하는 페이지에 `generateStaticParams` 함수를 추가했습니다:

```typescript
export async function generateStaticParams() {
    return [];
}
```

하지만 새로운 오류가 발생했습니다:
```
Error: Page "/products/[id]/page" cannot use both "use client" and export function "generateStaticParams()".
```

## 2. 원인 분석

1. **동적 라우팅과 정적 내보내기의 충돌**: Next.js의 정적 내보내기는 빌드 시점에 모든 페이지를 생성해야 하는데, 동적 라우팅을 사용하는 페이지의 경우 가능한 모든 경로를 미리 알아야 합니다.

2. **클라이언트 컴포넌트와 정적 생성의 충돌**: 'use client' 지시문을 사용하는 페이지에서는 `generateStaticParams`를 사용할 수 없습니다. 이는 클라이언트 사이드 렌더링과 정적 생성이 서로 상충되기 때문입니다.

3. **로컬 스토리지 의존성**: 우리 애플리케이션은 데이터를 로컬 스토리지에 저장하는데, 이는 클라이언트 사이드에서만 접근 가능합니다. 이로 인해 서버 사이드에서 정적 페이지를 생성하는 것이 불가능합니다.

## 3. 가능한 해결 방안

1. **서버 컴포넌트로 전환**: 동적 라우팅을 사용하는 페이지를 서버 컴포넌트로 전환하고, 클라이언트 상태 관리는 하위 컴포넌트로 분리합니다.

2. **API 라우트 사용**: 로컬 스토리지 대신 API 라우트를 사용하여 데이터를 관리합니다.

3. **하이브리드 렌더링**: 정적으로 생성할 수 있는 페이지와 클라이언트 사이드에서 렌더링해야 하는 페이지를 분리합니다.

4. **대체 호스팅 서비스 사용**: Vercel과 같은 Next.js에 최적화된 호스팅 서비스를 사용하는 것을 고려합니다.

## 4. 현재 상태

현재는 다음과 같은 방향으로 문제 해결을 진행 중입니다:
1. GitHub Actions 워크플로우 제거
2. 정적 내보내기 비활성화
3. 서버 컴포넌트와 클라이언트 컴포넌트의 적절한 분리 구조 검토 중

## 5. 교훈

1. Next.js 애플리케이션을 GitHub Pages에 배포할 때는 사전에 다음 사항을 고려해야 합니다:
   - 동적 라우팅의 사용 여부
   - 클라이언트 사이드 상태 관리 방식
   - 서버 사이드 기능의 필요성

2. GitHub Pages는 정적 웹사이트 호스팅에 최적화되어 있으므로, Next.js의 모든 기능을 활용하기 위해서는 다른 호스팅 서비스를 고려하는 것이 좋을 수 있습니다.

## 6. 다음 단계

1. 서버 컴포넌트와 클라이언트 컴포넌트의 명확한 분리
2. 데이터 관리 방식 재검토
3. 대체 호스팅 서비스 조사
