'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Morphing particle sphere — world reaching out from a single point
// Slow-breathing, premium feel: sphere breathes and shed particles outward
export default function MorphGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.offsetWidth, H = mount.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
    camera.position.z = 5.5;

    const group = new THREE.Group();
    scene.add(group);

    // Point cloud sphere
    const COUNT = 2200;
    const R = 2;
    const positions = new Float32Array(COUNT * 3);
    const originalPos = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution for even coverage
      const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);
      positions[i * 3] = originalPos[i * 3] = x;
      positions[i * 3 + 1] = originalPos[i * 3 + 1] = y;
      positions[i * 3 + 2] = originalPos[i * 3 + 2] = z;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Two point layers: inner bright, outer soft glow
    const matInner = new THREE.PointsMaterial({
      color: 0xd4a855, size: 0.022, sizeAttenuation: true,
      transparent: true, opacity: 0.85,
    });
    const matOuter = new THREE.PointsMaterial({
      color: 0xf0cc88, size: 0.038, sizeAttenuation: true,
      transparent: true, opacity: 0.2,
    });

    const pointsInner = new THREE.Points(geo, matInner);
    const pointsOuter = new THREE.Points(geo, matOuter);
    group.add(pointsInner, pointsOuter);

    // Wireframe rings (latitude lines only)
    const RINGS = 8;
    for (let r = 1; r < RINGS; r++) {
      const lat = (r / RINGS) * Math.PI - Math.PI / 2;
      const ringR = R * Math.cos(lat);
      const y = R * Math.sin(lat);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(ringR * Math.cos(a), y, ringR * Math.sin(a)));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({ color: 0xc9a063, transparent: true, opacity: 0.08 });
      group.add(new THREE.Line(ringGeo, ringMat));
    }

    // 3 longitude rings
    for (let l = 0; l < 3; l++) {
      const rot = (l / 3) * Math.PI;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(R * Math.cos(a), R * Math.sin(a), 0));
      }
      const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lMat = new THREE.LineBasicMaterial({ color: 0xc9a063, transparent: true, opacity: 0.07 });
      const line = new THREE.Line(lGeo, lMat);
      line.rotation.y = rot;
      group.add(line);
    }

    // Glow halo
    const haloGeo = new THREE.SphereGeometry(R * 1.18, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xc9a063, transparent: true, opacity: 0.03, side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(haloGeo, haloMat));

    let t = 0, animId: number;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.007;

      // Breathing morph: points expand/contract in waves
      for (let i = 0; i < COUNT; i++) {
        const ox = originalPos[i * 3];
        const oy = originalPos[i * 3 + 1];
        const oz = originalPos[i * 3 + 2];
        const breathe = 1 + Math.sin(t * 0.9 + phases[i]) * 0.04;
        const ripple = Math.sin(oy * 1.5 + t * 1.4 + phases[i] * 0.5) * 0.06;
        const scale = breathe + ripple;
        posAttr.array[i * 3]     = ox * scale;
        posAttr.array[i * 3 + 1] = oy * scale;
        posAttr.array[i * 3 + 2] = oz * scale;
      }
      posAttr.needsUpdate = true;

      group.rotation.y += 0.0025;
      group.rotation.x = Math.sin(t * 0.15) * 0.06;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.offsetWidth, h = mount.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
