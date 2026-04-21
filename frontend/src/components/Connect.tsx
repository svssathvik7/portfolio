import { SiGmail, SiInstagram, SiX, SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const LINKS = [
  {
    label: 'svssathvik77@gmail.com',
    href: 'mailto:svssathvik77@gmail.com',
    icon: <SiGmail />,
    sky: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/svssathvik7',
    icon: <SiGithub />,
    sky: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/venkata-sai-sathvik-seethamraju-a76596230/',
    icon: <FaLinkedinIn />,
    sky: false,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/svssathvik',
    icon: <SiInstagram />,
    sky: false,
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/stvk231133',
    icon: <SiX />,
    sky: false,
  },
] as const;

export default function Connect() {
  return (
    <section id="connect" className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-12">
        <div
          className="relative rounded-[32px] px-10 py-16 sm:px-16 text-center overflow-hidden"
          style={{ background: 'oklch(18% 0.035 205)' }}
        >
          {/* Sun glow */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: '-80px',
              right: '-80px',
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle, var(--c-sky-300), transparent 70%)',
              opacity: 0.4,
              filter: 'blur(4px)',
            }}
          />

          {/* Cloud deco */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              bottom: '-30px',
              left: '-20px',
              width: '180px',
              height: '50px',
              background: 'oklch(96% 0.02 205 / 0.15)',
            }}
          >
            <div
              className="absolute rounded-full"
              style={{ width: '90px', height: '90px', top: '-44px', left: '30px', background: 'inherit' }}
            />
            <div
              className="absolute rounded-full"
              style={{ width: '60px', height: '60px', top: '-24px', left: '110px', background: 'inherit' }}
            />
          </div>

          <h2
            className="font-medium mb-4 relative"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 58px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'oklch(97% 0.015 205)',
            }}
          >
            Let's build something{' '}
            <em className="not-italic" style={{ color: 'var(--c-sky-300)' }}>
              bright
            </em>
            .
          </h2>

          <p
            className="mb-8 mx-auto relative"
            style={{
              color: 'oklch(75% 0.04 205)',
              maxWidth: '48ch',
              fontSize: '16px',
              lineHeight: 1.6,
            }}
          >
            I'm open to full-time roles and interesting collaborations. I reply fastest to email — promise.
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center relative">
            {LINKS.map(({ label, href, icon, sky }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border transition-all duration-150 hover:-translate-y-0.5"
                style={
                  sky
                    ? {
                        background: 'var(--bg)',
                        color: 'var(--c-ink)',
                        borderColor: 'transparent',
                        boxShadow: '0 8px 0 -4px var(--c-sky-400)',
                      }
                    : {
                        background: 'transparent',
                        color: 'oklch(92% 0.02 205)',
                        borderColor: 'oklch(80% 0.03 205 / 0.4)',
                      }
                }
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        <footer
          className="mt-10 text-center text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-mute)' }}
        >
          © 2026 Sathvik. made with ☁️ and too many console.logs.
        </footer>
      </div>
    </section>
  );
}
