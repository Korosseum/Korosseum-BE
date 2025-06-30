<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 🧾 NestJS 도메인 단위 폴더 구조 & 네이밍/Git/커밋 룰

### 1. 폴더 구조 예시 (도메인 단위)

```
src/
  user/
    user.controller.ts
    user.service.ts
    user.module.ts
    dto/
      create-user.dto.ts
      update-user.dto.ts
    entity/
      user.entity.ts
    user.repository.ts
    user.util.ts
    user.controller.spec.ts
  auth/
    auth.controller.ts
    auth.service.ts
    auth.module.ts
    dto/
      login.dto.ts
    entity/
      auth.entity.ts
```

- 각 도메인(user, auth 등) 폴더에 해당 도메인 관련 파일을 모두 모은다!
- dto, entity 등은 하위 폴더로 분리해 관리한다!
- 테스트 파일(.spec.ts)도 도메인 폴더 안에 위치!

---

### 2. 네이밍 컨벤션 (NestJS 도메인 구조 기준)

| 항목        | 방식        | 예시                                       |
| ----------- | ----------- | ------------------------------------------ |
| 도메인 폴더 | kebab-case  | user, auth, product                        |
| 하위 폴더   | kebab-case  | dto, entity, util                          |
| 파일명      | kebab-case  | user.service.ts, create-user.dto.ts        |
| 클래스명    | PascalCase  | UserService, AuthController, CreateUserDto |
| 변수/함수   | camelCase   | getUserById, accessToken                   |
| 환경변수    | UPPER_SNAKE | DB_HOST, JWT_SECRET, PORT                  |

- DTO, Entity, Service, Controller 등은 PascalCase + 접미사(Dto, Entity, Service, Controller)!
- 파일명은 kebab-case + 접미사(dto, service, controller 등)!

---

### 3. Git 브랜치 네이밍 규칙

| 목적      | 네이밍 규칙 예시                            |
| --------- | ------------------------------------------- |
| 기능 개발 | feature/{기능-설명} → feature/user-auth-api |
| 버그 수정 | fix/{버그-설명} → fix/invalid-token-error   |
| 문서 작업 | docs/{문서-내용} → docs/api-docs-update     |
| 핫픽스    | hotfix/{이슈-설명} → hotfix/prod-db-conn    |

- 브랜치명은 영어 소문자, kebab-case 사용 권장!
- 도메인명/기능명 등으로 명확하게 작성!

---

### 4. Git 브랜치 전략

| 브랜치명   | 목적             |
| ---------- | ---------------- |
| main       | 배포 전용 브랜치 |
| develop    | 통합 개발 브랜치 |
| feature/\* | 기능 개발 단위   |
| fix/\*     | 버그 수정        |
| docs/\*    | 문서 관련        |

---

### 5. 커밋 메시지 컨벤션

| 태그     | 의미           |
| -------- | -------------- |
| Feat     | ✨ 기능 추가   |
| Fix      | 🐛 버그 수정   |
| Style    | 💄 스타일 변경 |
| Docs     | 📝 문서 변경   |
| Refactor | 🔨 리팩토링    |
| Test     | ✅ 테스트 코드 |
| Chore    | 🔧 기타 설정   |

- 커밋 메시지 예시:
  ```
  ✨ Feat: 유저 회원가입 API 구현
  🐛 Fix: 토큰 만료 예외 처리
  ```

---
