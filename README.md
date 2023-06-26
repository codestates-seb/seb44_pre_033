# 🎴 3ddang Over Flow

프로젝트 기간 : 2023.06.09 ~ 2023.06.27 (13일)

## 🗂️ Project Docs
📋 <a href="https://www.notion.so/codestates/5efceb8f2bd6488ab344038ca84c4bdf?pvs=4">사용자 요구사항 정의서<a/>
<br/> 🎨 <a href="https://www.figma.com/file/rZQ9dlYffNx9ynTCKaqPtC/pre_project_033?type=design&node-id=92%3A5&mode=dev">피그마 프로토타입<a/>

## 👨‍👨‍👧‍👦 Team members

| 김진솔<br>(FE Leader) | 이준석<br>(FE) | 정지은<br>(FE) |
|:--------:| :--------: | :--------: |
| <img src="" alt="김진솔" width="100" height="100">| <img src="" alt="이준석" width="100" height="100"> | <img src="" alt="정지은" width="100" height="100"> | 
|[@jinsoul75](https://github.com/jinsoul75) | [@LeeJSYS](https://github.com/LeeJSYS) | [@jieun9999](https://github.com/jieun9999) | 
| <p align="left"><br/>- 질문 CRUD <br/>- 답변 CRUD<br/> | <p align="left">- 메인페이지 <br/>- 공통 컴포넌트 <br/>haeder/footer/aside/navbar <br/>- 페이지네이션| <p align="left">- 질문 작성페이지<br/>- 로그인 <br/>- 로그아웃 <br />- 회원가입 | 

| 김윤<br>(BE Leader) | 정우형<br>(BE) | 정다희<br>(BE) |
| :--------: | :--------: | :--------: |
| <img src="" alt="김윤" width="100" height="100"> | <img src="" alt="정우형" width="100" height="100"> | <img src="" alt="정다희" width="100" height="100"> |
| [@Yooney1](https://github.com/Yooney1) | [@rktdngud](https://github.com/rktdngud) | [@sftm0715](https://github.com/sftm0715) |
| <p align="left">- 보안관련 데이터 관리<br/>- 질문 데이터<br/>|<p align="left">- 좋아요/싫어요<br/>- 유저 데이터 관리<br/>|<p align="left">- Member Info Page (RUD)<br/>- 회원가입 데이터<br/>- 답변 데이터<br/>||||

</br>

## ✨ Features

### 회원 기능

- 회원가입
- 로그인 / 로그아웃

### 질문(게시글) 기능

- 질문 조회
- 질문 작성 (회원만 가능)
- 질문 수정 (질문 작성자만 가능)
- 질문 삭제 (질문 작성자만 가능)
    - 질문 삭제 시, 질문 조회 불가능
    - 질문 삭제 시, 관련 답변 모두 조회 불가능
- 질문 필터링 (오래된순, 최신순)
- 메인 페이지 질문 페이지 네이션

### 답변 기능

- 답변 작성 (답변 작성자만 가능)
- 답변 수정 (답변 작성자만 가능)
- 답변 삭제 (답변 작성자만 가능)
- 답변 필터링 (좋아요순, 오래된순, 최신순)

## 💻 Stack
### Front-end

| Html | CSS | JavaScript | React-Toolkit | Styled<br>Components | axios | esLint | Figma | React<br>Router |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <img alt="Html" src ="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/440px-HTML5_logo_and_wordmark.svg.png" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://user-images.githubusercontent.com/111227745/210204643-4c3d065c-59ec-481d-ac13-cea795730835.png" alt="CSS" width="50" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://styled-components.com/logo.png" alt="styled-components icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://axios-http.com/assets/logo.svg" width="65" height="65"/></div> | <div style="display: flex; align-items: flex-start;"><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white" width="100" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" width="100" height="65"/></div> | <div style="display: flex; align-items: flex-start;"><img src="https://reactrouter.com/_brand/react-router-stacked-color.svg" width="100" height="65"/></div> |

</br>

### Back-end

| Java | Spring | Spring Boot | Spring Security | MySQL | AWS |
| --- | --- | --- | --- | --- | --- |
| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/java-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="spring logo" src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" height="50" width="50" > | <img alt="spring-boot logo" src="https://t1.daumcdn.net/cfile/tistory/27034D4F58E660F616" width="65" height="65" > | <img alt="spring-security logo" width="60px" src="https://camo.githubusercontent.com/923e99a57f8a456fdade5f65b35ada254be277612ddc991afb702d8dfd880d4f/68747470733a2f2f63646e2e73696d706c6569636f6e732e6f72672f737072696e677365637572697479" width="85" height=auto > | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div> |

</br>

### Tools

| Github | Discord | Notion |
| --- | --- | --- |
| <img alt="github logo" src="https://techstack-generator.vercel.app/github-icon.svg" width="65" height="65"> | <img alt="Discord logo" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg" height="65" width="65"> | <img alt="Notion logo" src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/shared/icons/notion-app-icon-3d.png" height="65" width="65"> |

</br>

## 🔗 Github Rule

### Commit Convention

|  Message   | 설명                                                  |
| :--------: | :---------------------------------------------------- |
| `Add` | 새로운 프로젝트, 파일 등 추가 |
| `Feat` | 새로운 기능 추가 |
| `Fix` | 버그 수정 |
| `Refactor` | 코드 리팩토링 |
| `Style` | 코드 포맷팅, 세미콜론 누락, 코드 스타일 변경 등 |
| `Remove` | 사용하지 않는 파일 또는 폴더 삭제 |
| `Rename` | 파일 또는 폴더명 수정 |
| `Chore` | 빌드 업무 수정, 패키지 매니저 수정 |

### Branch

- `main` : 서비스 운영 브랜치 
- `dev` : 메인 브랜치 배포전 브랜치  
- `[member name]/[feature name]` : 기능 개발 브랜치

</br>
