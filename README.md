<h1 align="center">svssathvik.dev</h1>

<p align="center">
  <strong>Personal developer portfolio</strong> — showcasing my work, experience, and ways to connect.
</p>

<p align="center">
  <a href="https://github.com/svssathvik7/portfolio/actions/workflows/ci-cd.yml">
    <img src="https://github.com/svssathvik7/portfolio/actions/workflows/ci-cd.yml/badge.svg" alt="CI + Deploy" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Bun-runtime-F9F1E1?logo=bun&logoColor=black" alt="Bun" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-deployed-F38020?logo=cloudflarepages&logoColor=white" alt="Cloudflare Pages" />
</p>

---

## About

A minimal, responsive portfolio built with **React 19**, **TypeScript**, and **Tailwind CSS v4**. Designed for speed — both in load time and development. Deployed on **Cloudflare Pages** with automated preview deployments on every PR.

### Sections

- **Hero** — Introduction, current role at [Garden Finance](https://garden.finance), and core tech stack (Rust, TypeScript, Bitcoin, Ethereum, Solana, Sui)
- **Experience** — Interactive timeline of work and education history
- **Projects** — Featured work including [Garden SDK](https://www.npmjs.com/search?q=%40gardenfi%2Fcore), [Garden Staking & Distribution](https://app.garden.finance/stake), and [Turbine RPC Proxy](https://crates.io/crates/turbine-rpc-proxy)
- **Connect** — Links to Gmail, Instagram, X, and GitHub

### Features

- Dark / light theme toggle with system preference detection
- Smooth scroll navigation with active section tracking
- Scroll-triggered animations via Intersection Observer
- Fully responsive — mobile-first with collapsible nav
- PR preview deployments via Cloudflare Pages

## Tech Stack

| Layer      | Tech                                  |
| ---------- | ------------------------------------- |
| Framework  | React 19                              |
| Language   | TypeScript 5.9                        |
| Styling    | Tailwind CSS 4                        |
| Build      | Vite 7                                |
| Runtime    | Bun                                   |
| Deployment | Cloudflare Pages                      |
| CI/CD      | GitHub Actions                        |

## Local Development

```bash
# clone
git clone https://github.com/svssathvik7/portfolio.git
cd portfolio

# install dependencies
bun install

# start dev server
cd frontend && bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it locally.

## CI/CD

| Trigger              | Action                                         |
| -------------------- | ---------------------------------------------- |
| Push to `main`       | Build check + production deploy                |
| PR opened/updated    | Build check + preview deploy (commented on PR) |
| PR closed            | Preview deployment cleanup                     |

## License

MIT

---

<p align="center">
  Built by <a href="https://github.com/svssathvik7"><strong>Sathvik</strong></a>
</p>
