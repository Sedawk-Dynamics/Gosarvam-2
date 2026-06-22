'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import VideoCardCanvas from './VideoCardCanvas';

export interface CinematicItem {
  slug: string;
  name: string;
  tag: string;
  desc: string;
  img: string;
  video?: string;
  grad: string;
}

interface Props {
  item: CinematicItem;
  fromRect: DOMRect;
  onClose: () => void;
}

export default function CinematicOverlay({ item, fromRect, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null!);
  const cardRef     = useRef<HTMLDivElement>(null!);
  const barTopRef   = useRef<HTMLDivElement>(null!);
  const barBotRef   = useRef<HTMLDivElement>(null!);
  const leakRef     = useRef<HTMLDivElement>(null!);
  const uiRef       = useRef<HTMLDivElement>(null!);
  const closingRef  = useRef(false);

  useEffect(() => {
    const backdrop = backdropRef.current;

    /* Card already positioned via style prop — just set other starting values */
    gsap.set(backdrop, { opacity: 0 });
    gsap.set([barTopRef.current, barBotRef.current], { scaleY: 0 });
    gsap.set(leakRef.current, { x: '-110%', opacity: 0 });
    gsap.set(uiRef.current, { opacity: 0, y: 16 });

    const tl = gsap.timeline();

    tl
      /* 1 — dim backdrop */
      .to(backdrop, { opacity: 1, duration: 0.22, ease: 'power2.out' })

      /* 2 — press-down bounce */
      .to(cardRef.current, { scale: 0.94, duration: 0.09, ease: 'power2.in' }, '<0.04')
      .to(cardRef.current, { scale: 1, duration: 0.14, ease: 'back.out(2)' })

      /* 3a — width snaps to full viewport → widescreen rectangle */
      .to(cardRef.current, {
        left: 0, width: '100vw', borderRadius: 10,
        duration: 0.22, ease: 'power2.out',
      })

      /* 3b — height fills screen with subtle 3-D tilt */
      .to(cardRef.current, {
        top: 0, height: '100vh', borderRadius: 0,
        duration: 0.42, ease: 'power3.inOut',
      })
      .to(cardRef.current, { rotateY: 3,  duration: 0.14, ease: 'power1.in'  }, '-=0.38')
      .to(cardRef.current, { rotateY: 0,  duration: 0.28, ease: 'power2.out' }, '-=0.24')

      /* 4 — letterbox bars */
      .to([barTopRef.current, barBotRef.current], {
        scaleY: 1, duration: 0.28, ease: 'power2.out',
      }, '-=0.28')

      /* 5 — light-leak sweep */
      .to(leakRef.current, { opacity: 0.8, x: '0%',   duration: 0.22, ease: 'power2.in'  }, '-=0.1')
      .to(leakRef.current, {               x: '110%', duration: 0.28, ease: 'power2.out' })
      .set(leakRef.current, { opacity: 0 })

      /* 6 — UI fade-up */
      .to(uiRef.current, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }, '-=0.1');

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    if (closingRef.current) return;
    closingRef.current = true;

    gsap.timeline({ onComplete: onClose })
      .to(uiRef.current, { opacity: 0, y: 8, duration: 0.18, ease: 'power2.in' })
      .to([barTopRef.current, barBotRef.current], { scaleY: 0, duration: 0.2 }, '<')
      .to(cardRef.current, {
        top: fromRect.top, height: fromRect.height, borderRadius: 10,
        duration: 0.32, ease: 'power3.inOut',
      }, '-=0.1')
      .to(cardRef.current, {
        left: fromRect.left, width: fromRect.width, borderRadius: 24,
        duration: 0.26, ease: 'power2.inOut',
      })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  }

  return (
    <>
      <div
        ref={backdropRef}
        className="cin-backdrop"
        onClick={close}
        onMouseMove={e => e.stopPropagation()}
      />

      {/* Initial size/position set via style prop so the card constrains
          its children from the very first render — before any useEffect runs */}
      <div
        ref={cardRef}
        className="cin-card"
        style={{
          background:   item.grad,
          position:     'fixed',
          left:         fromRect.left,
          top:          fromRect.top,
          width:        fromRect.width,
          height:       fromRect.height,
          borderRadius: 24,
          zIndex:       10001,
          overflow:     'hidden',
        }}
      >
        <VideoCardCanvas
          key={`cin-${item.slug}`}
          videoSrc={item.video}
          imgSrc={item.img}
        />

        <div className="cin-veil" />
        <div ref={leakRef}   className="cin-leak" />
        <div ref={barTopRef} className="cin-bar cin-bar-top" />
        <div ref={barBotRef} className="cin-bar cin-bar-bot" />

        <div
          ref={uiRef}
          className="cin-ui"
          onMouseMove={e => e.stopPropagation()}
        >
          <button className="cin-close" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="cin-info">
            <span className="cin-tag">{item.tag}</span>
            <h2 className="cin-name">{item.name}</h2>
            <p className="cin-desc">{item.desc}</p>
            <Link href={`/products/${item.slug}`} className="cin-cta">
              Full Specifications
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 13 13 3M6 3h7v7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
