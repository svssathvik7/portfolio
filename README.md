# Sathvik's Portfolio

Personal portfolio site — built to showcase my work, experience, and ways to connect.

**Live:** _[add deployed URL here]_

## What's Inside

- **Hero** — Quick intro, current role at Garden Finance, and core tech stack (Rust, TypeScript, Bitcoin, Ethereum, Solana, Sui)
- **Experience** — Timeline of work and education history
- **Projects** — Featured work including Garden SDK, Garden Staking & Distribution, and Turbine RPC Proxy
- **Connect** — Links to Gmail, Instagram, X, and GitHub

## Tech Stack

| Layer    | Stack                              |
| -------- | ---------------------------------- |
| Frontend | React 19, TypeScript, Tailwind CSS |
| Backend  | Hono, TypeScript                   |
| Build    | Vite                               |
| Runtime  | Bun                                |

## Getting Started

```bash
# install dependencies
bun install

# run frontend
cd frontend && bun run dev

# run backend
cd backend && bun run dev
```

## CI/CD

- Build checks on PRs and pushes to `main`
- Preview deployments on PRs
- Production deployment on push to `main`
