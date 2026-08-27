# 관리자 데이터 분석 대시보드

데이터 연동형 관리자 분석 대시보드입니다. 현재는 실제 데이터가 연결되어 있지 않아
모든 화면이 Skeleton/EmptyState로 표시되지만, 실제 데이터(CSV/JSON/API)를 연결하면
각 메뉴의 KPI·차트·테이블에 자동으로 반영되도록 설계되어 있습니다.

핵심 원칙: **기능/데이터/비즈니스 로직**과 **디자인/UI 스타일**을 완전히 분리합니다.
디자인을 전면 교체해도 데이터 구조, 매핑, 라우팅, 메뉴 기능은 영향을 받지 않습니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드
```

## 레이어 구조

```
src/
├── design-system/   # 색상·타이포·간격·그림자 등 모든 시각적 값 (CSS 변수)
├── data/            # models(타입) → aliases(컬럼 별칭) → mapper/parser/normalizer
├── logic/           # ranking / comparison / advertising / insight 계산 로직
├── navigation/       # 메뉴/URL 라우팅의 단일 소스 (menuConfig.ts)
├── components/       # Sidebar, DataTable, KpiCard, LineChart 등 재사용 UI
└── pages/            # 개요, 이벤트 발생 및 순위비교, BM 구조, 광고비 활용,
                        인사이트 및 결론, 출처
```

데이터 흐름:

```
원본 데이터 (CSV/JSON/API)
  → normalizer.ts   (형식 무관하게 RawRecord[] 로 통일)
  → aliases.ts + mapper.ts  (컬럼명/별칭 → 내부 필드로 매핑)
  → parser.ts       (RawRecord[] → 정규화된 Game/AdSpend/... 모델)
  → logic/*.ts       (순위 변동, 증감률 등 파생 계산)
  → components/pages (데이터만 props로 전달받아 렌더링)
```

## 실제 데이터 연결 방법

1. 원본 데이터를 CSV 문자열이면 `normalizer.parseCsv`, JSON이면 `normalizer.parseJson`
   (또는 이미 파싱된 API 응답이면 `normalizer.normalizeToRecordArray`)로 `RawRecord[]`를 만든다.
2. `parser.buildDataset({...})`에 넘겨 `DashboardDataset`을 만든다.
3. `<DataProvider dataset={dataset}>`으로 앱에 주입한다 (`src/App.tsx`).

컬럼명이 `game_name`, `gameName`, `게임명` 등 어떤 형태로 오더라도
`src/data/aliases.ts`에 등록된 별칭을 통해 동일한 내부 필드로 자동 매핑된다.
새 별칭이 필요하면 `aliases.ts`에 한 줄만 추가하면 되고, 컴포넌트/페이지 코드는
전혀 수정할 필요가 없다.

## 디자인 교체

모든 색상/타이포/간격/그림자/사이드바 폭 등은 `src/design-system/tokens.css`의
CSS 변수 하나로만 정의된다. 디자인을 전면 교체하려면 이 파일(과 필요하면
`base.css`, 각 컴포넌트의 `*.module.css`)만 수정하면 되며, `data/`, `logic/`,
`navigation/`, 페이지의 라우팅/로직 코드는 전혀 건드릴 필요가 없다.
