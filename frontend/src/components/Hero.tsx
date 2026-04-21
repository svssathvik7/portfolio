import { useRef } from "react";
import { SiEthereum } from "react-icons/si";
import { LuBookOpen } from "react-icons/lu";

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
    }deg) rotateX(${-y * maxDeg}deg) translateY(-2px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return { ref, onMouseMove, onMouseLeave };
}

export default function Hero() {
  const tilt = useTilt(6);

  return (
    <section id="hero" className="w-full py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
        <div
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        >
          {/* Left: text */}
          <div>
            {/* Kicker badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 text-xs font-medium"
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--c-sky-100)",
                borderColor: "var(--c-sky-200)",
                color: "var(--c-accent-ink)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: "oklch(65% 0.18 150)",
                  animation: "pulse-ring 2s infinite",
                }}
              />
              open to new opportunities
            </div>

            <h1
              className="font-medium leading-[1.02] mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(44px, 7vw, 86px)",
                letterSpacing: "-0.035em",
                color: "var(--c-ink)",
                maxWidth: "14ch",
              }}
            >
              Hi{" "}
              <span
                className="inline-block"
                style={{
                  transformOrigin: "70% 70%",
                  animation: "wave-hand 3.2s ease-in-out infinite",
                  display: "inline-block",
                }}
              >
                👋
              </span>
              , I'm Sathvik — <br />I build{" "}
              <span
                className="relative inline-block"
                style={{ color: "var(--c-accent-ink)" }}
              >
                reliable
                <span
                  className="absolute rounded-md"
                  style={{
                    left: "-2%",
                    right: "-2%",
                    bottom: "4%",
                    height: "30%",
                    zIndex: -1,
                    background: "var(--c-sky-200)",
                    transform: "skew(-6deg)",
                  }}
                />
              </span>{" "}
              systems.
            </h1>

            <p
              className="mb-7 leading-relaxed"
              style={{
                fontSize: "18px",
                maxWidth: "52ch",
                color: "var(--c-ink-soft)",
              }}
            >
              I build systems that don&apos;t break, sing when the code compiles, and always have one more move left.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                className="inline-flex items-center gap-2.5 px-[22px] py-3.5 rounded-full font-semibold text-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
                style={{
                  background: "var(--c-ink)",
                  color: "var(--bg)",
                  boxShadow: "0 8px 0 -4px oklch(30% 0.05 205), var(--shadow)",
                }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See my work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

              <a
                href="#connect"
                className="inline-flex items-center gap-2.5 px-[22px] py-3.5 rounded-full font-semibold text-sm border transition-all duration-150 hover:-translate-y-0.5"
                style={{
                  background: "var(--c-card)",
                  color: "var(--c-ink)",
                  borderColor: "var(--c-line)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("connect")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                Get in touch
              </a>
            </div>
          </div>

          {/* Right: hero card */}
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="relative rounded-[32px] border p-6 transition-all duration-300 hover:rotate-0 hover:-translate-y-1 hidden md:block"
            style={{
              background: "var(--c-card)",
              borderColor: "var(--c-line)",
              boxShadow: "var(--shadow)",
              transform: "rotate(2deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Floating bubble decorations */}
            <div
              className="absolute w-7 h-7 rounded-full"
              style={{
                top: "-14px",
                right: "24px",
                background: "var(--c-sky-300)",
                boxShadow: "0 6px 14px oklch(60% 0.14 205 / 0.45)",
                animation: "bob 4s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-9 h-9 rounded-full border-2"
              style={{
                bottom: "-10px",
                left: "-10px",
                background: "var(--c-sky-100)",
                borderColor: "var(--c-sky-200)",
                animation: "bob 6s ease-in-out -2s infinite",
              }}
            />

            <div
              className="text-xs mb-1"
              style={{ fontFamily: "var(--font-mono)", color: "var(--c-mute)" }}
            >
              {"/* now */"}
            </div>
            <div
              className="text-5xl leading-none mb-4 tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
                color: "var(--c-ink)",
              }}
            >
              building<span style={{ color: "var(--c-accent-ink)" }}>.</span>
            </div>

            {[
              { k: "reading", v: "Designing Data-Intensive Apps", chip: <LuBookOpen size={16} /> },
              { k: "listening", v: "Ilayaraja melodies", chip: <span>♫</span> },
              { k: "tinkering", v: "Cross-chain technologies", chip: <SiEthereum size={16} /> },
            ].map(({ k, v, chip }) => (
              <div
                key={k}
                className="flex items-center justify-between gap-3 py-3 border-t"
                style={{ borderColor: "var(--c-line)", borderStyle: "dashed" }}
              >
                <div>
                  <div
                    className="text-xs mb-0.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--c-mute)",
                    }}
                  >
                    {k}
                  </div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {v}
                  </div>
                </div>
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-[8px] shrink-0"
                  style={{
                    background: "var(--c-sky-100)",
                    color: "var(--c-accent-ink)",
                    fontSize: "16px",
                  }}
                >
                  {chip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
