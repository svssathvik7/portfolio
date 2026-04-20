import { useRef, useState } from "react";

interface Project {
  title: string;
  description: string;
  href?: string;
  tags: string[];
  previewUrl: string;
}

function microlinkThumb(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

const PROJECTS: Project[] = [
  {
    title: "Turbine RPC Proxy",
    description:
      "Multi-chain RPC proxy with intelligent load balancing, health checks, caching, hedged requests, and per-endpoint auth. Any JSON-RPC chain.",
    href: "https://crates.io/crates/turbine-rpc-proxy",
    tags: ["Rust", "Multi-Chain", "Infrastructure"],
    previewUrl: "https://rpc-proxy-testnet.prod-coolify-rack.dealpulley.com/hashira-dashboard",
  },
  {
    title: "Garden SDK",
    description:
      "TypeScript SDK for cross-chain atomic swaps. Bitcoin HTLC support, multi-wallet connectors, Sui & Spark integration.",
    href: "https://www.npmjs.com/search?q=%40gardenfi%2Fcore",
    tags: ["TypeScript", "Bitcoin", "HTLC"],
    previewUrl: "https://app.garden.finance/",
  },
  {
    title: "Garden Staking",
    description:
      "Rust-based staking and reward distribution system. On-chain reward calculations with deterministic precision accounting.",
    href: "https://app.garden.finance/stake",
    tags: ["Rust", "Staking", "Rewards"],
    previewUrl: "https://app.garden.finance/stake",
  },
  {
    title: "Opus Music",
    description:
      "Free online vocal remover — upload an MP3, AI strips the lead vocals, download the instrumental. Next.js + FastAPI with Demucs.",
    href: "https://opus-music.vercel.app/",
    tags: ["Next.js", "FastAPI", "Demucs"],
    previewUrl: "https://opus-music.vercel.app/",
  },
  {
    title: "Raga Vault",
    description:
      "Platform for singers to store songs, stage content, and metadata — with advanced filtering to find songs matching complex criteria.",
    href: "https://singers-frontend.pages.dev/",
    tags: ["React", "Hono", "TypeScript"],
    previewUrl: "https://singers-frontend.pages.dev/",
  },
];

function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${
      x * maxDeg
    }deg) rotateX(${-y * maxDeg}deg) translateY(-6px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return { ref, onMouseMove, onMouseLeave };
}

function ProjectCard({ project }: { project: Project }) {
  const tilt = useTilt(6);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="relative rounded-2xl border overflow-hidden transition-all duration-300 group"
      style={{
        background: "var(--c-card)",
        borderColor: "var(--c-line)",
        boxShadow: "var(--shadow-sm)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* External link peek */}
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[18px] right-[18px] z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[-25deg]"
          style={{
            background: "var(--c-sky-100)",
            color: "var(--c-accent-ink)",
          }}
          aria-label={`${project.title} (opens in new tab)`}
          onClick={(e) => e.stopPropagation()}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      )}

      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "repeating-linear-gradient(45deg, var(--c-sky-100) 0 8px, var(--c-sky-50) 8px 16px)",
        }}
      >
        {!imgFailed && (
          <img
            src={microlinkThumb(project.previewUrl)}
            alt={`${project.title} preview`}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-[22px] pt-4">
        <h3
          className="font-semibold mb-1.5 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            letterSpacing: "-0.02em",
            color: "var(--c-ink)",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-[1.55] mb-3.5"
          style={{ color: "var(--c-ink-soft)" }}
        >
          {project.description}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-[6px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--c-accent-ink)",
                background: "var(--c-sky-50)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-8 mb-10 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-0.5 w-6 rounded-full"
                style={{ background: "var(--c-accent)" }}
              />
              <span
                className="text-xs uppercase tracking-widest font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--c-accent-ink)",
                }}
              >
                Selected work
              </span>
            </div>
            <h2
              className="font-medium leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 52px)",
                letterSpacing: "-0.03em",
                maxWidth: "22ch",
                color: "var(--c-ink)",
              }}
            >
              Things I've shipped, broken, and lovingly rewritten.
            </h2>
          </div>
          <a
            href="https://github.com/svssathvik7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all hover:-translate-y-0.5 shrink-0"
            style={{
              background: "var(--c-card)",
              borderColor: "var(--c-line)",
              color: "var(--c-ink)",
            }}
          >
            All projects →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
