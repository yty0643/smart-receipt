# smart-receipt

금융결제원 API를 통해 사용자의 계좌를 조회하고 분석하여 다양한 통계(그래프)를 제공하는 웹 서비스이다.

## 프로젝트 계획 이유

여러 토이 프로젝트를 진행하며 REST API를 많이 다루었지만, HTTP 통신, CORS, Ajax, Axios, proxy server등 개념 정리가 부족하다고 느껴졌다.
그래서 본 프로젝트를 통해 금융결제원 API를 다루며 여러 통신 관련 문제를 해결하면서 개념을 익히고 Redux, RTK를 통한 앱 개발 역량을 강화하고자 한다.

> 프로젝트를 진행하며 공부한 기술이나 라이브러리에 대한 내용은 [개발 문서](https://github.com/yty0643/development-documents)에 작성했다.

## 문제점

### 금융결제원 API

금융결제원 API로 실제 계좌와 정보를 조회하기 위해선 결제(유료)가 필요하다.
Test API와 임시데이터(수작업)을 통해 프로젝트를 개발하는 방법도 있지만, 실제 서비스가 아닌 보여주기식 프로젝트로 끝날 것 같아서 고민중이다.

### Project revert

금융결제원 API를 사용하기 위해 proxy, axios 테스트 파일을 너무 많이 만들었더니 전부 삭제하고 처음부터 다시 시작하고 싶었다.

1. local의 smart-receipt을 삭제하고 CRA redux-typescript로 다시 앱을 만들었다.
2. remote origin 을 기존의 repository로 설정했다.
3. repository에 git push -f origin main을 통해 강제로 덮어쓰기 했다.
