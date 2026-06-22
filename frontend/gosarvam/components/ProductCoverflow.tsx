'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { CinematicItem } from './CinematicOverlay';

const CinematicOverlay = dynamic(() => import('./CinematicOverlay'), { ssr: false });

const ITEMS = [
  { slug: 'assam-tea',  img: '/images/assam-tea.png',       video: '/videos/assam-tea.mp4', grad: '#3d5a2a', glow: '139,20,20',   tag: '01 · Premium Tea', name: 'Assam Orthodox Tea',   desc: 'Hand-plucked black tea from the misty estates of Upper Assam.' },
  { slug: 'jute',       img: '/images/jute-products.png',   video: undefined,          grad: '#7a5a3a', glow: '120,100,55',  tag: '02 · Eco Fibre',   name: 'Jute Products',         desc: 'Biodegradable jute bags, sacks, and rugs — the golden fibre of Bengal.' },
  { slug: 'fox-nuts',   img: '/images/fox-nuts.png',        video: '/videos/fox-nuts.mp4', grad: '#c09a5a', glow: '220,210,190', tag: '03 · Superfood',   name: 'Fox Nuts (Makhana)',    desc: 'Hand-roasted lotus seeds — protein-rich, gluten-free, globally loved.' },
  { slug: 'jaggery',    img: '/images/jaggery.png',         video: '/videos/jaggery.mp4',  grad: '#c07830', glow: '212,143,56',  tag: '04 · Sweetener',   name: 'Organic Jaggery',       desc: 'Unrefined sugarcane jaggery — mineral-rich, chemical-free.' },
  { slug: 'moringa',    img: '/images/moringa.png',         video: '/videos/moringa.mp4',  grad: '#5a7a38', glow: '80,140,50',   tag: '05 · Superfood',   name: 'Moringa Powder',        desc: 'The miracle leaf, sun-dried and stone-milled.' },
  { slug: 'cow-dung',   img: '/images/cow-dung.png',        video: undefined,          grad: '#7a5a3a', glow: '140,110,70',  tag: '06 · Sacred Eco',  name: 'Eco Solutions',         desc: 'Vedic incense, organic manure, eco-pots — ancestral materials reimagined.' },
  { slug: 'essentials', img: '/images/food-essentials.png', video: undefined,          grad: '#c05a2a', glow: '200,90,42',   tag: '07 · Pantry',      name: 'Food Essentials',       desc: 'Pulses, spices, grains, oils — export-graded Indian pantry.' },
];

const N     = ITEMS.length;
const ANGLE = 360 / N;
const R     = 420;
const SNAP_T = '1.1s cubic-bezier(0.16, 1, 0.3, 1)';

/* Given an unbounded rotation, return the nearest snapped rotation + active index */
function snapNearest(rot: number) {
  const steps = Math.round(-rot / ANGLE);
  const idx   = ((steps % N) + N) % N;
  return { snappedRot: -steps * ANGLE, idx };
}

export default function ProductCoverflow() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotation,  setRotation]  = useState(0);
  const [dragging,  setDragging]  = useState(false);
  const [cinematic, setCinematic] = useState<{ item: CinematicItem; rect: DOMRect } | null>(null);

  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef    = useRef<HTMLDivElement>(null);
  const stageRef      = useRef<HTMLDivElement>(null);
  const rotRef        = useRef(rotation);           // always-current rotation for closures
  const drag          = useRef({ active: false, startX: 0, startRot: 0, moved: false });
  const wheelTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWheelTime = useRef(0);

  /* Keep rotRef in sync */
  useEffect(() => { rotRef.current = rotation; }, [rotation]);


  /* Global mouse-move / mouse-up listeners */
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      const newRot = drag.current.startRot + dx * 0.52;
      rotRef.current = newRot;
      setRotation(newRot);

      /* Update active index live while dragging */
      const { idx } = snapNearest(newRot);
      setActiveIdx(idx);
    }

    function onUp() {
      if (!drag.current.active) return;
      drag.current.active = false;

      /* Enable snap transition, then snap to nearest card */
      setDragging(false);
      setTimeout(() => {
        const { snappedRot, idx } = snapNearest(rotRef.current);
        setActiveIdx(idx);
        setRotation(snappedRot);
      }, 0);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  /* Wheel scroll — step one card at a time, debounced */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      /* Only respond to clear horizontal gestures (trackpad swipe).
         body has overflow-x:hidden so no page scroll happens on deltaX anyway —
         passive:true is safe and keeps the compositor from waiting for JS. */
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX <= absY) return;
      const now = Date.now();
      if (now - lastWheelTime.current < 320) return;
      lastWheelTime.current = now;
      if (e.deltaX > 0) stepBy(1); else stepBy(-1);
    }

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stepBy(dir: 1 | -1) {
    setActiveIdx(a => {
      const j = ((a + dir) % N + N) % N;
      setRotation(r => { const next = r - dir * ANGLE; rotRef.current = next; return next; });
      return j;
    });
  }

  function goTo(j: number) {
    if (j === activeIdx) return;
    let diff = j - activeIdx;
    if (diff >  N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setActiveIdx(j);
    setRotation(r => { const next = r - diff * ANGLE; rotRef.current = next; return next; });
  }

  function handleMouseDown(e: React.MouseEvent) {
    drag.current = { active: true, startX: e.clientX, startRot: rotation, moved: false };
    setDragging(true);
  }

  function handleTouchStart(e: React.TouchEvent) {
    drag.current = { active: true, startX: e.touches[0].clientX, startRot: rotation, moved: false };
    setDragging(true);
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (!drag.current.active) return;
    const dx = e.touches[0].clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    const newRot = drag.current.startRot + dx * 0.52;
    rotRef.current = newRot;
    setRotation(newRot);
    const { idx } = snapNearest(newRot);
    setActiveIdx(idx);
  }
  function handleTouchEnd() {
    drag.current.active = false;
    setDragging(false);
    setTimeout(() => {
      const { snappedRot, idx } = snapNearest(rotRef.current);
      setActiveIdx(idx);
      setRotation(snappedRot);
    }, 0);
  }

  function handleCardClick(i: number) {
    if (drag.current.moved) return; // was a drag, not a click
    if (i === activeIdx) {
      const el = cardRefs.current[i];
      if (!el) return;
      setCinematic({ item: ITEMS[i], rect: el.getBoundingClientRect() });
    } else {
      goTo(i);
    }
  }

  const active    = ITEMS[activeIdx];
  const wheelT    = dragging ? 'none' : SNAP_T;
  const cardBaseT = dragging ? 'opacity 0.3s ease' : `transform ${SNAP_T}, box-shadow 0.5s ease, opacity 0.5s ease`;

  return (
    <div
      ref={sectionRef}
      className="arc-section"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >

      {/* Ambient glow */}
      <div
        className="arc-ambient"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 80%, rgba(${active.glow},0.22) 0%, transparent 70%)` }}
      />

      {/* Wheel — hub below stage, only top arc visible */}
      <div ref={stageRef} className="arc-stage">
        {/* Bottom fog fades cards into the section */}
        <div className="arc-stage-fog" />
        <div
          className="arc-wheel"
          style={{ transform: `rotate(${rotation}deg)`, transition: `transform ${wheelT}` }}
        >
          {ITEMS.map((item, i) => {
            const cardAngle = ANGLE * i;
            const isActive  = i === activeIdx;

            return (
              <div
                key={item.slug}
                className="arc-card-pos"
                style={{ transform: `rotate(${cardAngle}deg) translateY(-${R}px)` }}
              >
                <div
                  ref={el => { cardRefs.current[i] = el; }}
                  className={`arc-card${isActive ? ' arc-active' : ''}`}
                  style={{
                    background: item.grad,
                    transform:  `rotate(${-(cardAngle + rotation)}deg)`,
                    transition: cardBaseT,
                    cursor: isActive ? (dragging ? 'grabbing' : 'pointer') : 'default',
                  }}
                  onClick={() => handleCardClick(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleCardClick(i)}
                  aria-label={isActive ? `Open ${item.name}` : `Select ${item.name}`}
                >
                  <div className="arc-img" style={{ backgroundImage: `url('${item.img}')` }} />
                  <div className="arc-veil" />
                  <div className="arc-frost" />
                  {isActive && <div className="arc-ring" />}
                  <div className="arc-card-label">
                    <span className="arc-card-tag">{item.tag}</span>
                    <span className="arc-card-name">{item.name}</span>
                  </div>
                  {isActive && (
                    <div className="arc-open-hint">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 13 13 3M6 3h7v7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active product info */}
      <div className="arc-info" key={activeIdx} onMouseDown={e => e.stopPropagation()}>
        <span className="arc-info-tag">{active.tag}</span>
        <h3 className="arc-info-name">{active.name}</h3>
        <p className="arc-info-desc">{active.desc}</p>
        <Link href={`/products/${active.slug}`} className="arc-cta">
          View product
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 13 13 3M6 3h7v7" />
          </svg>
        </Link>
      </div>

      {cinematic && createPortal(
        <CinematicOverlay
          item={cinematic.item}
          fromRect={cinematic.rect}
          onClose={() => setCinematic(null)}
        />,
        document.body
      )}
    </div>
  );
}
