import { useEffect, useRef, useState } from "react";

interface Checkpoint {
  t: number;
  when: string;
  role: string;
  company: string;
  orgHref?: string;
  story: string;
  tools: string[];
  side: "above" | "below";
}

const CHECKPOINTS: Checkpoint[] = [
  {
    t: 0.05,
    when: "2021 – 2025",
    role: "B.Tech CSE (Honors)",
    company: "MVGR College of Engineering",
    story:
      "Graduated with a CGPA of 9.37. Built strong CS fundamentals, fell in love with systems programming, and shipped more side projects than assignments.",
    tools: ["C++", "Java", "Python", "CGPA 9.37"],
    side: "below",
  },
  {
    t: 0.5,
    when: "Sep 2024 – Jun 2025",
    role: "SDE Intern",
    company: "Garden Finance",
    orgHref: "https://garden.finance/",
    story:
      "Built and maintained backend infrastructure for cross-chain swap protocols. Worked on the Garden SDK — TypeScript SDK for Bitcoin HTLC atomic swaps across EVM, Sui, and Spark.",
    tools: ["Rust", "TypeScript", "Bitcoin", "EVM"],
    side: "above",
  },
  {
    t: 0.93,
    when: "Jun 2025 – present",
    role: "Software Developer I",
    company: "Garden Finance",
    orgHref: "https://garden.finance/",
    story:
      "Full-time backend engineer powering cross-chain swaps. Owns the staking & distributor system, RPC proxy infra, and multi-chain settlement pipelines.",
    tools: ["Rust", "TypeScript", "Distributed Systems", "Blockchain"],
    side: "below",
  },
];

const PATH_D = "M 60 360 Q 260 80 480 240 T 900 180 T 1140 80";
const VIEW_W = 1200;
const VIEW_H = 460;
const CARD_W = 264;

export default function Experience() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>(
    [],
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const computePositions = () => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const total = path.getTotalLength();
    path.style.strokeDasharray = String(total);
    if (!inView) path.style.strokeDashoffset = String(total);

    const { width, height } = container.getBoundingClientRect();
    setContainerWidth(width);

    const scaleX = width / VIEW_W;
    const scaleY = height / VIEW_H;

    setPositions(
      CHECKPOINTS.map((cp) => {
        const pt = path.getPointAtLength(total * cp.t);
        return { x: pt.x * scaleX, y: pt.y * scaleY };
      }),
    );
  };

  useEffect(() => {
    // Small delay so the container is laid out before measuring
    const t = setTimeout(computePositions, 50);
    const ro = new ResizeObserver(computePositions);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !inView) return;
    path.style.transition = "stroke-dashoffset 2.4s cubic-bezier(.5,.1,.3,1)";
    path.style.strokeDashoffset = "0";
  }, [inView]);

  // Clamp card so it never overflows left or right edges
  const cardLeft = (posX: number) => {
    const ideal = posX - CARD_W / 2;
    const min = 8;
    const max = Math.max(8, containerWidth - CARD_W - 8);
    return Math.max(min, Math.min(max, ideal));
  };

  const showCard = (i: number) => hoveredIdx === i;

  return (
    <section
      id="experience"
      className="w-full py-24"
      style={{
        background:
          "linear-gradient(180deg, transparent, var(--c-sky-50) 30%, var(--c-sky-50) 70%, transparent)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
        {/* Section header */}
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
            Experience
          </span>
        </div>
        <h2
          className="font-medium leading-tight mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.5vw, 52px)",
            letterSpacing: "-0.03em",
            maxWidth: "22ch",
            color: "var(--c-ink)",
          }}
        >
          My path, plotted along a little arc.
        </h2>
        <p
          className="mb-10 text-base"
          style={{ color: "var(--c-ink-soft)", maxWidth: "56ch" }}
        >
          Hover or tap a checkpoint to read the story.
        </p>

        {/*
          Extra vertical padding gives the hover cards room to extend above/below
          the SVG without being clipped by a parent overflow. No overflow constraints here.
        */}
        <div
          style={{
            paddingTop: "160px",
            paddingBottom: "160px",
            marginTop: "-160px",
            marginBottom: "-160px",
          }}
        >
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: "clamp(220px, 28vw, 340px)" }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              style={{ overflow: "visible" }}
              aria-hidden
            >
              <path
                d={PATH_D}
                fill="none"
                stroke="var(--c-sky-200)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="var(--c-accent)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 2px 10px oklch(55% 0.15 205 / 0.3))",
                }}
              />
            </svg>

            {positions.map((pos, i) => {
              const cp = CHECKPOINTS[i];
              if (!cp) return null;
              const visible = showCard(i);
              const left = cardLeft(pos.x);

              return (
                <div
                  key={i}
                  className="absolute z-10"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Dot */}
                  <div
                    className="relative w-[22px] h-[22px] rounded-full border-4 transition-all duration-200"
                    style={{
                      background: visible ? "var(--c-accent)" : "var(--c-card)",
                      borderColor: "var(--c-accent)",
                      boxShadow: "0 6px 18px oklch(55% 0.15 205 / 0.35)",
                      transform: visible ? "scale(1.3)" : "scale(1)",
                    }}
                    aria-label={`${cp.role} at ${cp.company}`}
                  />

                  {/* Card — positioned absolutely relative to the spline container, not the dot */}
                  <div
                    style={{
                      position: "absolute",
                      width: `${CARD_W}px`,
                      left: `${left - pos.x}px`,
                      ...(cp.side === "above"
                        ? { bottom: "28px" }
                        : { top: "28px" }),
                      background: "var(--c-card)",
                      border: "1px solid var(--c-line)",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow: "var(--shadow)",
                      opacity: visible ? 1 : 0,
                      transform: visible
                        ? "translateY(0) scale(1)"
                        : "translateY(8px) scale(0.96)",
                      pointerEvents: visible ? "auto" : "none",
                      transition:
                        "opacity 0.2s ease, transform 0.25s cubic-bezier(.2,.9,.3,1.3)",
                      zIndex: 20,
                    }}
                  >
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-[6px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: "var(--c-sky-100)",
                        color: "var(--c-accent-ink)",
                      }}
                    >
                      {cp.when}
                    </span>
                    <div
                      className="font-semibold mt-2.5 mb-0.5 leading-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        letterSpacing: "-0.02em",
                        color: "var(--c-ink)",
                      }}
                    >
                      {cp.role}
                    </div>
                    <div
                      className="font-semibold text-xs"
                      style={{ color: "var(--c-accent-ink)" }}
                    >
                      {cp.orgHref ? (
                        <a
                          href={cp.orgHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {cp.company}
                        </a>
                      ) : (
                        cp.company
                      )}
                    </div>
                    <p
                      className="mt-2.5 text-xs leading-[1.5]"
                      style={{ color: "var(--c-ink-soft)" }}
                    >
                      {cp.story}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {cp.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{
                            fontFamily: "var(--font-mono)",
                            background: "var(--c-sky-50)",
                            color: "var(--c-accent-ink)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="flex justify-between text-xs mt-4 px-1"
          style={{ fontFamily: "var(--font-mono)", color: "var(--c-mute)" }}
        >
          <span>2021 — hello world</span>
          <span>today ✦</span>
        </div>
      </div>
    </section>
  );
}
