# 백엔드 포트폴리오 준비 체크리스트

## ✅ 1. 기술 스택 세팅

- [x] NestJS + TypeScript 프로젝트 세팅
- [x] PostgreSQL + TypeORM 연동
- [x] Redis 연동 (세션, 캐싱 용도)
- [x] Docker + Docker Compose 설정

## ✅ 2. 핵심 기능 구현

- [ ] 회원가입 / 로그인 (JWT 기반 인증)
- [ ] CRUD API (게시글, 댓글 등)
- [ ] 검색 기능 (Elasticsearch or 단순 쿼리 기반)
- [ ] 좋아요, 북마크 등 유저 상호작용
- [ ] RBAC 권한 관리

## ✅ 3. 대용량 트래픽 대응 구조 설계

- [ ] Redis 캐싱 (게시글, 사용자 세션 등)
- [ ] Rate Limiting 구현
- [ ] BullMQ / RabbitMQ를 통한 비동기 작업 처리 (예: 알림, 이메일)
- [ ] 부하 테스트 (Locust 또는 K6 사용)

## ✅ 4. MSA & 인프라 구성

- [ ] 서비스 분리 (Auth / Post / Notification 등)
- [ ] API Gateway 설정
- [ ] CI/CD 구성 (GitHub Actions)
- [ ] AWS에 배포 (EC2 + RDS + S3)

## ✅ 5. 문서화 및 정리

- [ ] Swagger를 통한 API 문서화
- [ ] ERD 및 시스템 아키텍처 다이어그램 작성
- [ ] README에 기술 스택/아키텍처/성능 테스트 결과 포함

## ✅ 6. 기술 학습 + 면접 준비

- [ ] NestJS의 내부 동작 원리 이해
- [ ] TypeORM의 QueryBuilder 및 Lazy Loading
- [ ] Redis, BullMQ 구조 및 사용 예제
- [ ] 대용량 트래픽 구조/캐싱 전략 정리
- [ ] 아하팀 관련 기술 키워드로 예상 질문 정리
