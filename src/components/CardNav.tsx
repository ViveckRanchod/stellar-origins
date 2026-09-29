'use client';

// Adapted from React Bits CardNav: next/link links that close the menu, Esc to close,
// lucide icon (no react-icons), text logo, optional note under each link, height measured on every screen size.
import Link from 'next/link';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

type CardNavLink = { label: string; href: string; note?: string };

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  items: CardNavItem[];
  cta?: { label: string; href: string };
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

export default function CardNav({
  logo,
  items,
  cta,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Open height = top bar + the cards' natural height, measured off-screen.
  const calculateHeight = () => {
    const navEl = navRef.current;
    const contentEl = navEl?.querySelector('.card-nav-content') as HTMLElement | null;
    if (!contentEl) return 260;
    const saved = { ...contentEl.style };
    Object.assign(contentEl.style, { visibility: 'visible', pointerEvents: 'auto', position: 'static', height: 'auto' });
    const contentHeight = contentEl.scrollHeight;
    Object.assign(contentEl.style, {
      visibility: saved.visibility,
      pointerEvents: saved.pointerEvents,
      position: saved.position,
      height: saved.height
    });
    return 60 + contentHeight + 8;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- upstream: rebuild only when the items or ease change
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      tlRef.current.kill();
      const newTl = createTimeline();
      if (newTl && isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        newTl.progress(1);
      }
      tlRef.current = newTl;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- upstream: only re-bind when open state changes
  }, [isExpanded]);

  const open = () => {
    setIsHamburgerOpen(true);
    setIsExpanded(true);
    tlRef.current?.play(0);
  };

  const close = () => {
    const tl = tlRef.current;
    if (!tl) return;
    setIsHamburgerOpen(false);
    tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tl.reverse();
  };

  const toggleMenu = () => (isExpanded ? close() : open());

  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container relative z-[99] mx-auto h-[60px] w-[calc(100%-2rem)] max-w-[800px] ${className}`}>
      <nav
        ref={navRef}
        className="card-nav absolute inset-x-0 top-0 block h-[60px] overflow-hidden rounded-2xl p-0 shadow-[inset_0_0_24px_rgb(255_255_255/0.06)] will-change-[height]"
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-2 pl-[1.1rem]">
          <button
            type="button"
            className="group order-2 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[6px] md:order-none"
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            style={{ color: menuColor || '#000' }}
          >
            <span
              className={`h-[2px] w-[26px] bg-current transition-[transform,opacity] duration-300 ease-linear group-hover:opacity-75 ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-[2px] w-[26px] bg-current transition-[transform,opacity] duration-300 ease-linear group-hover:opacity-75 ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>

          <Link
            href="/"
            onClick={() => isExpanded && close()}
            className="order-1 font-heading text-[17px] font-medium md:absolute md:top-1/2 md:left-1/2 md:order-none md:-translate-x-1/2 md:-translate-y-1/2"
            style={{ color: menuColor }}
          >
            {logo}
          </Link>

          {cta && (
            <Link
              href={cta.href}
              onClick={() => isExpanded && close()}
              className="hidden h-full items-center rounded-full px-5 text-[15px] font-medium transition-opacity duration-300 hover:opacity-85 md:inline-flex"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              {cta.label}
            </Link>
          )}
        </div>

        <div
          className={`card-nav-content absolute top-[60px] right-0 bottom-0 left-0 z-[1] flex flex-col items-stretch justify-start gap-2 p-2 ${
            isExpanded ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
          } md:flex-row md:items-stretch md:gap-3`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="nav-card relative flex min-w-0 flex-[1_1_auto] flex-col gap-2 rounded-xl p-[12px_16px] select-none md:flex-[1_1_0%]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="font-heading text-[18px] tracking-[-0.5px] md:text-[20px]">{item.label}</div>
              <div className="mt-auto flex flex-col gap-1">
                {item.links.map((lnk) => (
                  <Link
                    key={lnk.href}
                    href={lnk.href}
                    onClick={close}
                    className="flex flex-col py-1 transition-opacity duration-300 hover:opacity-75"
                  >
                    <span className="inline-flex items-center gap-[6px] text-[15px]">
                      <ArrowUpRight aria-hidden className="size-4 shrink-0" />
                      {lnk.label}
                    </span>
                    {lnk.note && <span className="pl-[22px] font-mono text-[10px] opacity-60">{lnk.note}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
