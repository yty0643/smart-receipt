# smart-receipt

금융결제원 API를 통해 사용자의 계좌를 조회하고 분석하여 다양한 통계(그래프)를 제공하는 웹 서비스이다.

---

## 느낀점

ajax, axios, cors, proxy, Redux, RTK 를 다뤄보고자 프로젝트를 진행했다.<br/>
대략적으로 알고있던 내용들인데, 제대로 이해하고자 학습 및 문제 해결 과정을 기록하며 프로젝트를 진행했고 해당 기술들을 이해하는데 큰 도움이 되었다.<br/>
많은 개발자들이 사용한다고 무작정 따라 사용하기 보다 왜 사용하는지 어떤부분이 좋은지 알아보고 사용하는게 중요하다고 생각한다.<br/>
개인적으로 리덕스의 store를 이용한 상태 관리 방식은 기존의 방식보다 훨씬 편리하다고 느껴졌다.<br/>
하지만 무작정 Redux에 의존하기 보다 컴포넌트 재사용성을 고려해서 기존의 props 전달방식도 함께 사용하는게 좋다고 생각된다.<br/>

프로젝트들을 진행할수록 리액트의 개발 컨셉(UI를 컴포넌트 단위로 생각)에 대해 깨닫는게 많은 것 같다.<br/>
다음번 프로젝트로 모바일 앱을 개발해보고싶다.<br/>

---

## 프로젝트 계획 이유

여러 토이 프로젝트를 진행하며 REST API를 많이 다루었지만, HTTP 통신, CORS, Ajax, Axios, proxy server등 개념 정리가 부족하다고 느껴졌고 본 프로젝트를 통해 금융결제원 API를 다루며 여러 통신 관련 문제를 해결하면서 개념을 익히고 Redux, RTK를 통한 앱 개발 역량을 강화하고자 한다.

> 프로젝트를 진행하며 공부한 기술이나 라이브러리에 대한 내용은 [개발 문서](https://github.com/yty0643/development-documents)에 작성했다.

---

## 문제점

### 최대 문제점

<img width="289" alt="캡처" src="https://user-images.githubusercontent.com/80657819/174089192-be99451a-863c-420e-a21b-83433f8976bc.PNG">

~~Axios로 금융결제원API를 호출하고있는데.. local환경에서는 잘 되지만 gh-pages를 설치하고 GitHub Pages로 호스팅된 웹에선 405 not allowed method 에러가 발생했고... stackoverflow나 다른 개발블로그들을 참고하며 해결하려고 많은 시간을 투자했으나... 결론은 Github Pages는 서버 측 프로그램을 지원하지 않고, 정적 웹 페이지 호스팅을 지원하기 때문에 데이터를 받아올 수 없다는 결론을 내렸다.~~

~~AWS Amplify에 대해 공부해서 추후 웹 호스팅 할 예정입니다.~~
06.23
[AWS](https://github.com/yty0643/development-documents/blob/main/AWS.md) 및 AWS Amplify에 대해 공부했고 smart-receipt 호스팅을 성공했다. 과금 문제 때문에 지속적으로 호스팅은 하지 않고 결과만 캡처해두었다.

<img width="960" alt="캡처" src="https://user-images.githubusercontent.com/80657819/175259399-29920597-945c-4a9b-bc57-71e9c1fef804.PNG">

<img width="960" alt="캡처2" src="https://user-images.githubusercontent.com/80657819/175259404-09692948-0f1e-426a-81fd-8799229819ad.PNG">

### ajax, axios, proxy, cors, Redux

관련 문제 해결 과정은 [개발 문서](https://github.com/yty0643/development-documents)에 작성했다.

### 슬라이드 배너

금융결제원에 등록한 계좌들을 라이브러리 도움 없이 슬라이드 배너 형식 UI로 작성하고자 했다.
힘들었던 부분은 무한히 슬라이딩이 가능하도록 만들고자 했던 점이다.
3개의 카드 배너를 오른쪽으로 무한히 슬라이드 해도 1 -> 2 -> 3 -> 1 -> 2 -> 3 이런식으로 보여주고자 했던 것.

### 그래프 라이브러리

계좌 거래 내역 데이터를 라이브러리 도움 없이 그래프를 직접 만들기로 함.
Canvas API의 존재를 이번에 처음 알게 됨. 라인차트를 만들기 위해 라인을 해당api를 통해 그려냈다.

### 금융결제원 API

금융결제원 API로 실제 계좌와 정보를 조회하기 위해선 결제(유료)가 필요하다.
Test API와 임시데이터(수작업)을 통해 프로젝트를 개발하는 방법도 있지만, 실제 서비스가 아닌 보여주기식 프로젝트로 끝날 것 같아서 고민중이다.

### git revert

git 초기화 진행.
협업을 안하니까 add commit push 이외의 명령어는 쓸일이 별로 없다.
저번에 로컬 저장소 두개로 프로젝트를 진행한 경험이있는데 병합하는게 귀찮아서 하나로만 하게되다보니... 잘 없다.

1. local의 smart-receipt을 삭제하고 CRA redux-typescript
2. remote origin 을 기존의 repository로 설정
3. repository에 git push -f origin main 강제 덮어쓰기

---
