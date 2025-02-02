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

## 2. 최종 해결 방법

결국 Next.js의 App Router에서 Pages Router로 마이그레이션하여 문제를 해결했습니다.

### 2.1. Pages Router로 마이그레이션

1. `src/pages` 디렉토리 생성
2. 기존 `app` 디렉토리의 파일들을 pages 구조에 맞게 이동:
   - `app/page.tsx` → `pages/index.tsx`
   - `app/products/page.tsx` → `pages/products/index.tsx`
   - `app/products/[id]/page.tsx` → `pages/products/[id]/index.tsx`
   - `app/products/[id]/edit/page.tsx` → `pages/products/[id]/edit.tsx`
   - `app/register/page.tsx` → `pages/register.tsx`

3. 필수 페이지 추가:
   ```typescript
   // pages/_app.tsx
   import type { AppProps } from 'next/app'
   import '@/styles/globals.css'

   export default function App({ Component, pageProps }: AppProps) {
     return <Component {...pageProps} />
   }
   ```

   ```typescript
   // pages/_document.tsx
   import { Html, Head, Main, NextScript } from 'next/document'

   export default function Document() {
     return (
       <Html lang="ko">
         <Head />
         <body>
           <Main />
           <NextScript />
         </body>
       </Html>
     )
   }
   ```

### 2.2. 정적 내보내기 설정

1. `next.config.js` 설정:
```javascript
const nextConfig = {
    output: 'export',
    basePath: '/mini-business',
    images: {
        unoptimized: true,
    },
}
```

2. `package.json`의 build 스크립트 수정:
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

### 2.3. GitHub Pages 배포

1. 빌드 실행:
```bash
npm run build
```

2. gh-pages 브랜치 생성 및 전환:
```bash
git checkout -b gh-pages
```

3. 빌드 결과물 복사:
```bash
xcopy /E /I /Y out\* .
```

4. 변경사항 커밋 및 푸시:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
```

5. GitHub 저장소 설정:
   - Settings → Pages
   - Source를 'gh-pages' 브랜치로 설정
   - Save 클릭

## 3. 교훈

1. Next.js 13+에서는 App Router와 Pages Router의 차이점을 잘 이해해야 합니다.
2. 정적 사이트 생성 시 Pages Router가 더 안정적일 수 있습니다.
3. GitHub Pages 배포 시 basePath 설정이 중요합니다.
4. 'next export' 대신 'output: export' 설정을 사용해야 합니다.

## 4. 참고사항

1. 이 해결방법은 클라이언트 사이드 렌더링에 의존하는 애플리케이션에 적합합니다.
2. 서버 사이드 렌더링이 필요한 경우 Vercel과 같은 호스팅 서비스를 고려해야 합니다.
3. 동적 라우팅을 사용하는 경우, 페이지가 클라이언트 사이드에서 올바르게 렌더링되는지 확인해야 합니다.
