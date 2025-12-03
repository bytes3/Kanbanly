# Repository Guidelines

## Project Structure & Module Organization
- `server.ts` boots the Hono app, global error handler, JWT guard, and mounts `/auth/register` and `/auth/login`.
- `src/routes/*-route.ts` contains HTTP handlers; `src/services` holds runtime services backed by `src/repositories` and `src/db` (Postgres via `DATABASE_URL`).
- `core/` defines domain entities, errors, and interfaces consumed across layers.
- Shared validators live in `shared/validators`; keep them in sync with payload changes. Cross-cutting helpers sit in `shared/utils`.
- SQL migrations are in `migration/` and driven by `bin/migration`; Docker configs for Postgres/Adminer are in `docker-compose.yml` with env templates in `config/postgresql.env.example` and `.env.example`.
- Tests co-locate with code (for example, `src/services/account-service.test.ts`) and share fixtures in `src/test/utils.ts`.

## Build, Test, and Development Commands
- Install deps: `bun install` (Yarn 4 is pinned but Bun runs scripts). Ensure `DATABASE_URL` is set.
- Run API locally: `bun run dev:server` (watches `server.ts`, defaults to port `3001`).
- Start database: `docker-compose up -d db adminer` (Postgres on 5432, Adminer on 4411).
- Apply migrations: `./bin/migration up`; create one with `./bin/migration create add_feature` (requires `goose` CLI).
- Tests: `bun test` or target a file `bun test src/services/account-service.test.ts`.

## Coding Style & Naming Conventions
- TypeScript with ES modules and 2-space indentation; prefer double quotes and trailing commas where they already appear.
- Use the `@/backend/...` absolute import alias from repo root. Keep routes/services/repositories/errors following `*-route.ts`, `*-service.ts`, `*-repository.ts`, `*-error.ts`.
- Classes/types use PascalCase; variables/functions camelCase. Keep handlers thin and delegate to services; validate inputs with `shared/validators` before executing logic.

## Testing Guidelines
- Tests use Bun’s built-in runner (`describe`, `it`, `expect` from `bun:test`) and should stay isolated from the database by mocking via `src/test/utils.ts`.
- Cover both happy paths and errors (e.g., `AccountAlreadyExist`, `AccountLoginFailure`) and stub required env vars like `SECRET_JWT`.

## Commit & Pull Request Guidelines
- Follow the existing Conventional-style prefixes in history (`feat:`, `chore:`, `fix:`) with imperative, concise subjects.
- PRs should summarize scope, list endpoints/modules touched, note migration impacts, and paste the commands/tests you ran (e.g., `bun test`, `./bin/migration up`). Link related issues and add request/response samples when helpful.

## Security & Configuration Tips
- Do not commit secrets. Base configs are in `.env.example` and `config/postgresql.env.example`; required vars include `DATABASE_URL` and `SECRET_JWT`.
- JWT middleware in `server.ts` protects `/home/*`; add protected routes there or extend the middleware intentionally.
- Validators guard inbound JSON; update them alongside route changes to keep runtime validation aligned with types.
