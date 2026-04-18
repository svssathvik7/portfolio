import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SiGmail, SiInstagram, SiX, SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import DoodleIcon from './decorations/DoodleIcon';

interface ContactItem {
  id: string;
  label: string;
  href: string;
  caption: string;
  isExternal: boolean;
  icon: ReactNode;
  color: string;
}

const CONTACTS: ContactItem[] = [
  {
    id: 'gmail',
    label: 'Gmail',
    href: 'mailto:svssathvik77@gmail.com',
    caption: 'For professional collaborations and opportunities.',
    isExternal: false,
    icon: <SiGmail />,
    color: '#EA4335',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/svssathvik',
    caption: 'For personal connects and behind-the-scenes.',
    isExternal: true,
    icon: <SiInstagram />,
    color: '#E4405F',
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/stvk231133',
    caption: 'For opinions, tech thoughts, and random takes.',
    isExternal: true,
    icon: <SiX />,
    color: 'var(--text)',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/svssathvik7',
    caption: 'For code, repos, and open-source contributions.',
    isExternal: true,
    icon: <SiGithub />,
    color: 'var(--text)',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/venkata-sai-sathvik-seethamraju-a76596230/',
    caption: 'For professional networking and career updates.',
    isExternal: true,
    icon: <FaLinkedinIn />,
    color: '#0A66C2',
  },
];

function ContactCard({
  item,
  isVisible,
  delay,
}: {
  item: ContactItem;
  isVisible: boolean;
  delay: number;
}) {
  const linkProps = item.isExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={item.href}
      {...linkProps}
      aria-label={item.label}
      className={`group block min-w-0 rounded-2xl border border-[var(--border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_15%,transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 sm:p-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      <div className='flex items-center gap-3'>
        <span
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110'
          style={{
            color: item.color,
            backgroundColor: 'color-mix(in srgb, var(--text-muted) 8%, transparent)',
          }}
        >
          {item.icon}
        </span>
        <h3
          className='text-base font-semibold transition-colors duration-300 group-hover:text-[var(--primary)] sm:text-lg'
          style={{ color: 'var(--text)' }}
        >
          {item.label}
        </h3>
      </div>
      <p
        className='mt-3 text-sm leading-relaxed'
        style={{ color: 'var(--text-muted)' }}
      >
        {item.caption}
      </p>
    </a>
  );
}

export default function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    sectionObserver.observe(el);

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const itemRefs = CONTACTS.map((_, i) =>
      document.getElementById(`connect-item-${i}`),
    ).filter(Boolean);

    const observers = itemRefs.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(i));
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -20px 0px' },
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [isVisible]);

  return (
    <section
      id='connect'
      ref={sectionRef}
      className='w-full py-10 sm:py-14 md:py-16'
      style={{ backgroundColor: 'var(--bg)' }}
      aria-labelledby='connect-heading'
    >
      <div className='mx-auto max-w-3xl px-6 sm:px-10 lg:px-12'>
        <div className='flex items-center gap-3'>
          <DoodleIcon
            variant='envelope'
            className='h-5 w-5 shrink-0 text-[var(--text-muted)] sm:h-6 sm:w-6'
          />
          <h2
            id='connect-heading'
            className='font-serif text-2xl font-bold tracking-tight sm:text-3xl'
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
          >
            Let&apos;s Connect
          </h2>
        </div>
        <p
          className='mt-2 text-base sm:text-lg'
          style={{ color: 'var(--text-muted)' }}
        >
          Open to conversations, collaborations, and ideas.
        </p>

        <div className='mt-10 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {CONTACTS.map((item, i) => (
            <div key={item.id} id={`connect-item-${i}`}>
              <ContactCard
                item={item}
                isVisible={visibleItems.has(i)}
                delay={i * 80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
