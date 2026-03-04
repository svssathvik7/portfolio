# portfolio

Monorepo with:
- `frontend`: React + TypeScript + Tailwind CSS (Vite)
- `backend`: Hono + TypeScript

## Runtime

This repo uses **Bun** (not npm).

## Scripts

From each package:
- Frontend: `bun run dev`, `bun run build`
- Backend: `bun run dev`, `bun run build`

## CI/CD

- CI build checks for both frontend and backend on PRs and pushes to `main`
- Preview deployment job on PRs
- Production deployment job on pushes to `main`

Deployment jobs are scaffolded and can be wired to your provider by setting required secrets.
