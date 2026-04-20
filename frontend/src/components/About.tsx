const FACTS = [
  { k: "location", v: "Hyderabad, India" },
  { k: "currently", v: "Garden Finance" },
  { k: "languages", v: "Rust, TS, Python" },
  { k: "passions", v: "Music & Chess" },
] as const;

export default function About() {
  return (
    <section id="about" className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
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
            About
          </span>
        </div>

        <h2
          className="font-medium text-4xl sm:text-5xl leading-tight mb-14"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            maxWidth: "22ch",
            color: "var(--c-ink)",
          }}
        >
          A curious engineer who builds across chains.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "var(--c-ink-soft)" }}
            >
              I'm a backend engineer based in Hyderabad, India. Most of my days
              are spent writing Rust and TypeScript — building the
              infrastructure that powers cross-chain swaps at{" "}
              <a
                href="https://garden.finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
                style={{ color: "var(--c-accent-ink)" }}
              >
                Garden Finance
              </a>
              .
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--c-ink-soft)" }}
            >
              Outside work I sing Carnatic classical, play chess whenever I find
              a worthy opponent, and occasionally get humbled by the Rust borrow
              checker on weekend side projects.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {FACTS.map(({ k, v }) => (
              <div
                key={k}
                className="rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-1 hover:-rotate-1"
                style={{
                  background: "var(--c-card)",
                  borderColor: "var(--c-line)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="text-[11px] mb-1"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
