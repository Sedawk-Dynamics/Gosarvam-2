/* GOSARVAM GLOBAL — main interactive engine
   Depends on Lenis, GSAP+ScrollTrigger+SplitText, Three.js (all from CDN in HTML) */

(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ============================================================
  // THEME TOGGLE
  // ============================================================
  const Theme = {
    get current() { return document.documentElement.dataset.theme || 'light'; },
    set(v) {
      document.documentElement.dataset.theme = v;
      try { localStorage.setItem('theme', v); } catch (e) {}
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', v === 'dark' ? '#0e0c0a' : '#fdfbf6');
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: v } }));
    },
    toggle() { this.set(this.current === 'dark' ? 'light' : 'dark'); }
  };
  window.GosarvamTheme = Theme;

  // Sync theme-color meta on first load
  (() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', Theme.current === 'dark' ? '#0e0c0a' : '#fdfbf6');
  })();

  const initThemeToggle = () => {
    $$('.theme-toggle').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => Theme.toggle());
    });
  };

  // ============================================================
  // PRELOADER — waits for window.load AND minimum display time,
  // syncs progress bar + orbit ring + percentage in lockstep.
  // ============================================================
  const preload = () => {
    const pre = $('.preloader');
    if (!pre) return Promise.resolve();
    return new Promise(resolve => {
      const bar    = pre.querySelector('.preloader-bar span');
      const pct    = pre.querySelector('.preloader-pct');
      const orbit  = pre.querySelector('.preloader-orbit');
      const chars  = pre.querySelectorAll('.preloader-logo .ch');
      const sub    = pre.querySelector('.preloader-sub');

      // Logo + tagline reveal
      gsap.to(chars, { y: 0, duration: 1.0, ease: 'expo.out', stagger: 0.04, delay: 0.1 });
      gsap.to(sub,   { opacity: 1, duration: 0.8, delay: 0.55 });

      const MIN_MS = 2400;            // minimum on-screen time for brand impact
      const start  = performance.now();

      // Track image load progress for a real signal
      const imgs   = [...document.querySelectorAll('img')].filter(i => !i.complete);
      const total  = imgs.length || 1;
      let   loaded = 0;
      const mark   = () => { loaded++; };
      imgs.forEach(img => {
        img.addEventListener('load',  mark, { once: true });
        img.addEventListener('error', mark, { once: true });
      });

      const winLoad = new Promise(r => {
        if (document.readyState === 'complete') return r();
        window.addEventListener('load', r, { once: true });
      });

      let displayed = 0; // 0..100 smoothed
      let target    = 0;

      const tick = () => {
        const elapsed = performance.now() - start;
        const timeP   = Math.min(1, elapsed / MIN_MS);
        const loadP   = loaded / total;
        target = Math.min(0.97, Math.max(timeP, loadP)) * 100;

        displayed += (target - displayed) * 0.12;
        const v = Math.round(displayed);

        bar.style.width = displayed + '%';
        pct.textContent = String(v).padStart(3, '0') + ' %';
        if (orbit) orbit.style.setProperty('--p', (displayed / 100).toFixed(3));

        if (displayed < 96) {
          requestAnimationFrame(tick);
        } else {
          // Wait for both: window load + minimum time before completing
          Promise.all([winLoad, new Promise(r => setTimeout(r, Math.max(0, MIN_MS - elapsed)))])
            .then(() => {
              // Snap to 100 then fade out
              gsap.to({ v: displayed }, {
                v: 100, duration: 0.45, ease: 'power2.out',
                onUpdate() {
                  const x = this.targets()[0].v;
                  bar.style.width = x + '%';
                  pct.textContent = String(Math.round(x)).padStart(3, '0') + ' %';
                  if (orbit) orbit.style.setProperty('--p', (x / 100).toFixed(3));
                },
                onComplete() {
                  gsap.to(pre, {
                    opacity: 0, yPercent: -100, duration: 0.95, ease: 'expo.inOut', delay: 0.25,
                    onComplete: () => { pre.remove(); resolve(); }
                  });
                }
              });
            });
        }
      };
      requestAnimationFrame(tick);
    });
  };

  // ============================================================
  // LENIS SMOOTH SCROLL
  // ============================================================
  let lenis;
  const initLenis = () => {
    if (typeof Lenis === 'undefined') return;
    lenis = new Lenis({
      duration: 1.25,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });
    if (typeof gsap !== 'undefined' && gsap.ticker) {
      lenis.on('scroll', () => ScrollTrigger?.update?.());
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  };

  // ============================================================
  // CUSTOM CURSOR
  // ============================================================
  const initCursor = () => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    const dot = document.createElement('div'); dot.className = 'cursor';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let x = 0, y = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });

    const loop = () => {
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('mouseover', e => {
      const t = e.target;
      if (t.closest('a, button, .product-card, .blog-card, .cert-card, .qa-chip, [data-cursor="hover"]')) {
        dot.classList.add('hover'); ring.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', e => {
      const t = e.target;
      if (t.closest('a, button, .product-card, .blog-card, .cert-card, .qa-chip, [data-cursor="hover"]')) {
        dot.classList.remove('hover'); ring.classList.remove('hover');
      }
    });
  };

  // ============================================================
  // MAGNETIC BUTTONS — rAF-throttled
  // ============================================================
  const initMagnetic = () => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    $$('.btn-magnetic').forEach(el => {
      const strength = parseFloat(el.dataset.strength || '0.3');
      let tx = 0, ty = 0, cx = 0, cy = 0, queued = false, settled = true;
      const apply = () => {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
          requestAnimationFrame(apply);
        } else { queued = false; if (settled) el.style.transform = ''; }
      };
      el.addEventListener('mousemove', e => {
        settled = false;
        const r = el.getBoundingClientRect();
        tx = (e.clientX - r.left - r.width / 2) * strength;
        ty = (e.clientY - r.top - r.height / 2) * strength;
        if (!queued) { queued = true; requestAnimationFrame(apply); }
      });
      el.addEventListener('mouseleave', () => {
        settled = true; tx = 0; ty = 0;
        if (!queued) { queued = true; requestAnimationFrame(apply); }
      });
    });
  };

  // ============================================================
  // SCROLL REVEAL — IntersectionObserver-driven, CSS transitions
  // (far cheaper than per-element ScrollTriggers, no scroll-pegged work)
  // ============================================================
  const initReveals = () => {
    const targets = $$('.r-up, .r-fade, .r-clip, .split-line');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
      targets.forEach(el => io.observe(el));
    } else {
      // Fallback — just show
      targets.forEach(el => el.classList.add('in'));
    }
    // Need GSAP only for ScrollTrigger-pegged things (world map dashed routes)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  };

  // ============================================================
  // COUNTERS
  // ============================================================
  const initCounters = () => {
    $$('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 2.4, ease: 'power3.out',
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
          });
        }
      });
    });
  };

  // ============================================================
  // NAV
  // ============================================================
  const initNav = () => {
    const nav = $('.nav');
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);

    // mobile drawer
    const burger = $('.nav-burger');
    const drawer = $('.mobile-drawer');
    if (burger && drawer) {
      burger.addEventListener('click', () => {
        drawer.classList.toggle('open');
      });
      drawer.addEventListener('click', e => {
        if (e.target.tagName === 'A') drawer.classList.remove('open');
      });
    }
  };

  // ============================================================
  // HERO TYPE REVEAL — direct CSS via GSAP for the title words
  // (these animate once on load, not via scroll)
  // ============================================================
  const initHeroReveal = () => {
    const heroTitle = $('.hero-title');
    if (!heroTitle) return;
    if (typeof gsap === 'undefined') {
      heroTitle.querySelectorAll('.word').forEach(w => w.style.transform = 'translateY(0)');
      return;
    }
    const words = heroTitle.querySelectorAll('.word');
    gsap.to(words, { y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.06, delay: 0.05 });
    gsap.from('.hero-sub, .hero-cta-row, .export-strip, .hero-meta', {
      opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', delay: 0.6, stagger: 0.08
    });
  };

  // ============================================================
  // THREE.JS — Hero Globe with export arcs + particles
  // ============================================================
  const initGlobe = () => {
    if (typeof THREE === 'undefined') return;
    const mount = $('#globe');
    if (!mount) return;

    // Skip on low-power devices to keep things smooth
    const isLowPower =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isLowPower) { mount.style.display = 'none'; return; }

    const w = mount.clientWidth, h = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Soft cream lighting
    scene.add(new THREE.AmbientLight(0xfff5e0, 0.55));
    const key = new THREE.DirectionalLight(0xfff1cf, 1.2);
    key.position.set(3, 3, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9a063, 0.55);
    rim.position.set(-4, -2, -3); scene.add(rim);

    const group = new THREE.Group(); scene.add(group);

    // Theme-aware globe colors
    const palette = () => (document.documentElement.dataset.theme === 'dark'
      ? { sphere: 0x1f1a13, dots: 0xd8b87a, atm: 0xd8b87a, arc: 0xd8b87a, tip: 0xecd9a8, traveler: 0xfff5e0, anchor: 0x8ea283, parts: 0xd8b87a }
      : { sphere: 0xf7eed8, dots: 0xa07a3e, atm: 0xc9a063, arc: 0xa07a3e, tip: 0xd8b885, traveler: 0xfff5e0, anchor: 0x4a5d3f, parts: 0xc9a063 });

    let pal = palette();

    // Globe — wireframe-ish dot sphere
    const R = 1.6;
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.MeshPhysicalMaterial({
        color: pal.sphere,
        roughness: 0.85,
        metalness: 0.05,
        clearcoat: 0.2,
        clearcoatRoughness: 0.6,
      })
    );
    group.add(sphere);

    // Dotted continent overlay (reduced count for perf)
    const dotGeo = new THREE.BufferGeometry();
    const dotCount = 900;
    const dotPos = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      // Fibonacci sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      // Mask: only show certain "land" points (random)
      if (Math.random() < 0.45) continue;
      const r = R * 1.005;
      dotPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dotPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPos[i * 3 + 2] = r * Math.cos(phi);
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dotMat = new THREE.PointsMaterial({
      color: pal.dots, size: 0.022, sizeAttenuation: true, transparent: true, opacity: 0.85
    });
    const dots = new THREE.Points(dotGeo, dotMat); group.add(dots);

    // Outer atmosphere (uniform-driven so we can re-color on theme change)
    const atmUniforms = { uColor: { value: new THREE.Color(pal.atm) } };
    const atm = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.06, 48, 48),
      new THREE.ShaderMaterial({
        uniforms: atmUniforms,
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 uColor; varying vec3 vN; void main(){ float i = pow(0.7 - dot(vN, vec3(0,0,1.0)), 2.2); gl_FragColor = vec4(uColor, i*0.85); }`,
        transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide
      })
    );
    group.add(atm);

    // Latitude rings
    for (let i = -2; i <= 2; i++) {
      const ringR = Math.cos(i * 0.35) * R;
      const ringGeo = new THREE.RingGeometry(ringR, ringR + 0.002, 96);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xc9a063, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = Math.sin(i * 0.35) * R;
      group.add(ring);
    }

    // Export routes — animated arcs
    const latLonToVec3 = (lat, lon, radius) => {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + 180) * Math.PI / 180;
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z =  (radius * Math.sin(phi) * Math.sin(theta));
      const y =  (radius * Math.cos(phi));
      return new THREE.Vector3(x, y, z);
    };

    // From India (~22N, 80E) to: USA, UK, UAE, Japan, Germany, Australia, Russia, S.Korea
    const india = [22, 80];
    const dests = [
      [38, -97],    // USA
      [54, -2],     // UK
      [24, 54],     // UAE
      [36, 138],    // Japan
      [51, 10],     // Germany
      [-25, 134],   // Australia
      [60, 100],    // Russia
      [37, 127],    // South Korea
      [1.3, 103.8], // Singapore
    ];

    const arcGroup = new THREE.Group(); group.add(arcGroup);
    const arcs = [];

    dests.forEach((d, idx) => {
      const start = latLonToVec3(india[0], india[1], R * 1.005);
      const end = latLonToVec3(d[0], d[1], R * 1.005);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const altitude = R * 0.6 * (0.7 + start.distanceTo(end) * 0.18);
      mid.normalize().multiplyScalar(R + altitude);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(64);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: pal.arc, transparent: true, opacity: 0.65 });
      const line = new THREE.Line(geom, mat);
      arcGroup.add(line);

      // Endpoint glow
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 12, 12),
        new THREE.MeshBasicMaterial({ color: pal.tip })
      );
      tip.position.copy(end); arcGroup.add(tip);

      // Pulse point
      const pulseMat = new THREE.MeshBasicMaterial({ color: pal.atm, transparent: true, opacity: 0.8 });
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), pulseMat);
      pulse.position.copy(end); arcGroup.add(pulse);

      // Traveling dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 16, 16),
        new THREE.MeshBasicMaterial({ color: pal.traveler })
      );
      arcGroup.add(dot);
      arcs.push({ curve, dot, pulse, line, tip, t: idx * 0.12, speed: 0.0042 + Math.random() * 0.002 });
    });

    // India anchor pulse
    const indiaPt = latLonToVec3(india[0], india[1], R * 1.005);
    const anchor = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: pal.anchor })
    );
    anchor.position.copy(indiaPt); arcGroup.add(anchor);

    // Floating particles (reduced count for perf)
    const partGeo = new THREE.BufferGeometry();
    const partCount = 90;
    const partPos = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount; i++) {
      const r = R + 0.4 + Math.random() * 0.8;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      partPos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      partPos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      partPos[i*3+2] = r * Math.cos(ph);
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const particles = new THREE.Points(partGeo, new THREE.PointsMaterial({
      color: pal.parts, size: 0.014, transparent: true, opacity: 0.65
    }));
    scene.add(particles);

    // React to theme changes — recolor materials
    window.addEventListener('themechange', () => {
      pal = palette();
      sphere.material.color.setHex(pal.sphere);
      dots.material.color.setHex(pal.dots);
      atmUniforms.uColor.value.setHex(pal.atm);
      particles.material.color.setHex(pal.parts);
      anchor.material.color.setHex(pal.anchor);
      arcs.forEach(a => {
        a.line.material.color.setHex(pal.arc);
        a.tip.material.color.setHex(pal.tip);
        a.pulse.material.color.setHex(pal.atm);
        a.dot.material.color.setHex(pal.traveler);
      });
    });

    // Mouse parallax
    let mx = 0, my = 0;
    mount.addEventListener('mousemove', e => {
      const r = mount.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      my = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    });

    const clock = new THREE.Clock();
    let rafId;
    let visible = true;
    const animate = () => {
      if (!visible) { rafId = requestAnimationFrame(animate); return; }
      group.rotation.y += 0.0025;
      group.rotation.x += (my * 0.4 - group.rotation.x) * 0.04;
      group.rotation.z += (-mx * 0.2 - group.rotation.z) * 0.04;
      particles.rotation.y -= 0.0006;

      arcs.forEach(a => {
        a.t += a.speed;
        if (a.t > 1) a.t = 0;
        const p = a.curve.getPoint(a.t);
        a.dot.position.copy(p);
        a.pulse.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + a.t * 6) * 0.4);
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Pause rendering when off-screen — major perf win when scrolled past hero
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; },
        { threshold: 0.05 }).observe(mount);
    }
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden && visible;
    });

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
  };

  // ============================================================
  // MARQUEE clone
  // ============================================================
  const initMarquee = () => {
    $$('.marquee-track').forEach(track => {
      track.innerHTML += track.innerHTML;
    });
  };

  // ============================================================
  // PRODUCT CARD HOVER PARALLAX — rAF-throttled, single transform write
  // ============================================================
  const initProductHover = () => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    $$('.product-card').forEach(card => {
      const img = card.querySelector('.img');
      if (!img) return;
      let tx = 0, ty = 0, cx = 0, cy = 0, rafQueued = false;
      const apply = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        img.style.transform = `scale(1.05) translate3d(${cx}px, ${cy}px, 0)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
          requestAnimationFrame(apply);
        } else {
          rafQueued = false;
        }
      };
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * -16;
        ty = ((e.clientY - r.top) / r.height - 0.5) * -16;
        if (!rafQueued) { rafQueued = true; requestAnimationFrame(apply); }
      });
      card.addEventListener('mouseleave', () => {
        tx = 0; ty = 0;
        if (!rafQueued) { rafQueued = true; requestAnimationFrame(apply); }
      });
    });
  };

  // ============================================================
  // WORLD MAP — animated route lines, triggered when in view
  // ============================================================
  const initWorldMap = () => {
    const stage = $('.world-stage');
    if (!stage) return;
    const routes = $$('.world-stage .route');
    routes.forEach(r => {
      const len = r.getTotalLength();
      r.style.strokeDasharray = len;
      r.style.strokeDashoffset = len;
      r.style.transition = 'stroke-dashoffset 2.6s cubic-bezier(0.22, 1, 0.36, 1)';
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          routes.forEach((r, i) => { setTimeout(() => r.style.strokeDashoffset = 0, i * 90); });
          obs.disconnect();
        }
      }, { threshold: 0.25 });
      io.observe(stage);
    } else {
      routes.forEach(r => r.style.strokeDashoffset = 0);
    }
  };

  // ============================================================
  // PAGE TRANSITION (light)
  // ============================================================
  const initPageTrans = () => {
    const overlay = $('.page-trans');
    if (!overlay) return;
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-trans]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || a.target === '_blank') return;
      e.preventDefault();
      gsap.to(overlay, {
        yPercent: -100, duration: 0.8, ease: 'expo.inOut',
        onStart: () => { overlay.style.transform = 'translateY(100%)'; gsap.set(overlay, {yPercent: 100}); gsap.to(overlay, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' }); },
        onComplete: () => { window.location.href = href; }
      });
    });
  };

  // ============================================================
  // BOOT
  // ============================================================
  document.addEventListener('DOMContentLoaded', async () => {
    initThemeToggle();
    initCursor();
    await preload();
    initLenis();
    initNav();
    initReveals();
    initCounters();
    initMagnetic();
    initMarquee();
    initHeroReveal();
    initGlobe();
    initProductHover();
    initWorldMap();
    // initPageTrans(); // disabled — keeps standard navigation snappy
  });
})();
