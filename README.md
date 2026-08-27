# team-page

GitHub 협업 실습으로 만든 팀 소개 페이지입니다.

## 팀원

| 이름 | 역할 |
|---|---|
| A | 팀장 / 뼈대 작성 |
| B | 스타일 담당 |
| C | 문서 담당 |
| D | 링크 담당 |

## 실행 방법

`index.html`을 브라우저로 열면 됩니다.

## 관리자 데이터 분석 대시보드

`admin-dashboard/` 디렉터리에 데이터 연동형 관리자 분석 대시보드가 있습니다.
자세한 내용은 [`admin-dashboard/README.md`](./admin-dashboard/README.md)를 참고하세요.

```bash
cd admin-dashboard
npm install
npm run dev
```

## 협업 규칙

1. main 직접 push 금지, 반드시 PR로 병합
2. PR은 1명 이상 Approve 후 merge
3. 커밋 메시지는 `feat:`, `fix:`, `docs:` 태그 사용
