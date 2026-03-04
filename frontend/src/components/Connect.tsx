import { useEffect, useRef, useState } from 'react';

interface ContactItem {
  id: string;
  label: string;
  value: string;
  href: string;
  caption: string;
  isExternal: boolean;
}

const CONTACTS: ContactItem[] = [
  {
    id: 'gmail',
    label: 'Gmail',
    value: 'svssathvik77@gmail.com',
    href: 'mailto:svssathvik77@gmail.com',
    caption: 'For professional collaborations and opportunities.',
    isExternal: false,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@svssathvik',
    href: 'https://instagram.com/svssathvik',
    caption: 'For personal connects and behind-the-scenes.',
    isExternal: true,
  },
  {
    id: 'x',
    label: 'X',
    value: '@stvk231133',
    href: 'https://x.com/stvk231133',
    caption: 'For opinions, tech thoughts, and random takes.',
    isExternal: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '@svssathvik7',
    href: 'https://github.com/svssathvik7',
    caption: 'For code, repos, and open-source contributions.',
    isExternal: true,
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
      aria-label={`${item.label}: ${item.value}`}
      className={`group block min-w-0 rounded-2xl border border-[var(--border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_15%,transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 sm:p-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      <h3
        className='text-base font-semibold transition-colors duration-300 group-hover:text-[var(--primary)] sm:text-lg'
        style={{ color: 'var(--text)' }}
      >
        {item.label}
      </h3>
      <p
        className='mt-1 min-w-0 break-words font-medium transition-colors duration-300 group-hover:text-[var(--primary)]'
        style={{ color: 'var(--primary)' }}
      >
        {item.value}
      </p>
      <p
        className='mt-2 text-sm leading-relaxed'
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
      className='w-full border-t py-16 sm:py-20 md:py-24'
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
      aria-labelledby='connect-heading'
    >
      <div className='mx-auto max-w-3xl px-6 sm:px-10 lg:px-12'>
        <h2
          id='connect-heading'
          className='font-serif text-2xl font-bold tracking-tight sm:text-3xl'
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          Let&apos;s Connect
        </h2>
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
