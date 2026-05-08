'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BrandSolarSystem() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Stats state for the counters
  const [stats, setStats] = useState([
    { id: 's1', val: 0, target: 50, suffix: '+', label: 'Projects' },
    { id: 's2', val: 0, target: 300, suffix: '%', label: 'Avg Growth' },
    { id: 's3', val: 0, target: 15, suffix: '+', label: 'Industries' },
    { id: 's4', val: 0, target: 98, suffix: '%', label: 'Satisfaction' },
  ]);

  useEffect(() => {
    // Run stat counters after a delay (matching the original code's setTimeout)
    const timeout = setTimeout(() => {
      const intervals = stats.map((stat, idx) => {
        let currentVal = 0;
        const step = stat.target / 55;
        return setInterval(() => {
          currentVal = Math.min(currentVal + step, stat.target);
          setStats(prev => {
            const newStats = [...prev];
            newStats[idx].val = Math.floor(currentVal);
            return newStats;
          });
          if (currentVal >= stat.target) {
            clearInterval(intervals[idx]);
          }
        }, 22);
      });
      return () => intervals.forEach(clearInterval);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const wrap = containerRef.current;
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(48, 2, 0.1, 120);
    camera.position.set(0, 1.8, 8);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    function resize() {
      if (!wrap) return;
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    // 1. CENTRAL GLOBE
    const gSphere = new THREE.SphereGeometry(1.15, 28, 28);
    const mSphere = new THREE.MeshBasicMaterial({ color: 0x00f5ff, wireframe: true, transparent: true, opacity: 0.13 });
    const meshSphere = new THREE.Mesh(gSphere, mSphere);
    scene.add(meshSphere);

    const gIco = new THREE.IcosahedronGeometry(1.17, 2);
    const mIco = new THREE.MeshBasicMaterial({ color: 0x9933ea, wireframe: true, transparent: true, opacity: 0.20 });
    const meshIco = new THREE.Mesh(gIco, mIco);
    scene.add(meshIco);

    const mInner = new THREE.MeshBasicMaterial({ color: 0x03000f, transparent: true, opacity: 0.97 });
    const meshInner = new THREE.Mesh(new THREE.SphereGeometry(1.05, 24, 24), mInner);
    scene.add(meshInner);

    const mCore = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.55 });
    const meshCore = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mCore);
    scene.add(meshCore);

    const mCore2 = new THREE.MeshBasicMaterial({ color: 0x9933ea, transparent: true, opacity: 0.30 });
    const meshCore2 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), mCore2);
    scene.add(meshCore2);

    // 2. SERVICE NODES
    const ORBIT_R = 2.55;
    const SERVICES = [
      { label: 'Social Media',     hex: '#c026d3', col: 0xc026d3, tiltX:  0,             tiltZ:  0,    speed:  0.0070, phase: 0.00          },
      { label: 'SEO & Content',    hex: '#00f5ff', col: 0x00f5ff, tiltX:  Math.PI/4.5,   tiltZ:  0.30, speed: -0.0058, phase: Math.PI       },
      { label: 'Brand Identity',   hex: '#3b82f6', col: 0x3b82f6, tiltX: -Math.PI/5,     tiltZ:  0.22, speed:  0.0048, phase: Math.PI/2     },
      { label: 'Paid Advertising', hex: '#f59e0b', col: 0xf59e0b, tiltX:  Math.PI/3.2,   tiltZ: -0.45, speed: -0.0082, phase: Math.PI*1.5   },
      { label: 'Website Design',   hex: '#10b981', col: 0x10b981, tiltX: -Math.PI/6.5,   tiltZ: -0.55, speed:  0.0042, phase: Math.PI*0.75  },
      { label: 'Ad Creatives',     hex: '#f43f5e', col: 0xf43f5e, tiltX:  Math.PI/2.8,   tiltZ:  0.65, speed: -0.0052, phase: Math.PI*1.25  },
    ];

    function pillRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y,     x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x,     y + h, r);
      ctx.arcTo(x,     y + h, x,     y,     r);
      ctx.arcTo(x,     y,     x + w, y,     r);
      ctx.closePath();
    }

    function makeLabel(text, hexCol) {
      const cv = document.createElement('canvas');
      cv.width = 300; cv.height = 64;
      const ctx = cv.getContext('2d');

      ctx.fillStyle = 'rgba(4, 0, 18, 0.80)';
      pillRect(ctx, 2, 2, 296, 60, 12);
      ctx.fill();

      ctx.strokeStyle = hexCol;
      ctx.lineWidth = 2.2;
      pillRect(ctx, 2, 2, 296, 60, 12);
      ctx.stroke();

      ctx.strokeStyle = hexCol + '55';
      ctx.lineWidth = 6;
      pillRect(ctx, 2, 2, 296, 60, 12);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 19px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 150, 32);

      const tex = new THREE.CanvasTexture(cv);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
      const sp  = new THREE.Sprite(mat);
      sp.scale.set(2.15, 0.46, 1);
      return sp;
    }

    const orbitObjects = SERVICES.map(svc => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.x = svc.tiltX;
      orbitGroup.rotation.z = svc.tiltZ;
      scene.add(orbitGroup);

      const trailPts = [];
      for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.035)
        trailPts.push(new THREE.Vector3(Math.cos(a) * ORBIT_R, 0, Math.sin(a) * ORBIT_R));
      const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPts);
      const trailMat = new THREE.LineBasicMaterial({ color: svc.col, transparent: true, opacity: 0.08 });
      orbitGroup.add(new THREE.Line(trailGeo, trailMat));

      const spinGroup = new THREE.Group();
      spinGroup.rotation.y = svc.phase;
      orbitGroup.add(spinGroup);

      const gNode = new THREE.SphereGeometry(0.10, 16, 16);
      const mNode = new THREE.MeshBasicMaterial({ color: svc.col });
      const node  = new THREE.Mesh(gNode, mNode);
      node.position.x = ORBIT_R;
      spinGroup.add(node);

      const gDot = new THREE.SphereGeometry(0.055, 8, 8);
      const mDot = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      const dot  = new THREE.Mesh(gDot, mDot);
      dot.position.x = ORBIT_R;
      spinGroup.add(dot);

      const label = makeLabel(svc.label, svc.hex);
      label.position.set(ORBIT_R, 0.36, 0);
      spinGroup.add(label);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(ORBIT_R, 0, 0)
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: svc.col, transparent: true, opacity: 0.22 });
      spinGroup.add(new THREE.Line(lineGeo, lineMat));

      return { spinGroup, svc, trailGeo, trailMat, gNode, mNode, gDot, mDot, lineGeo, lineMat, labelTex: label.material.map, labelMat: label.material };
    });

    // 3. DATA PARTICLE STREAMS
    const PC = 380;
    const pPos = new Float32Array(PC * 3);
    const pVel = new Float32Array(PC * 3);
    const pCol = new Float32Array(PC * 3);

    const C_CYAN   = new THREE.Color(0x00f5ff);
    const C_PURPLE = new THREE.Color(0x9933ea);
    const C_BLUE   = new THREE.Color(0x3b82f6);
    const C_PINK   = new THREE.Color(0xf43f5e);

    function spawnParticle(i) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 3.0 + Math.random() * 1.8;

      pPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i*3+2] = r * Math.cos(phi);

      const spd = 0.009 + Math.random() * 0.007;
      pVel[i*3]   = -pPos[i*3]   / r * spd;
      pVel[i*3+1] = -pPos[i*3+1] / r * spd;
      pVel[i*3+2] = -pPos[i*3+2] / r * spd;

      const pick = Math.random();
      const col  = pick < 0.35 ? C_CYAN : pick < 0.60 ? C_PURPLE : pick < 0.80 ? C_BLUE : C_PINK;
      pCol[i*3]   = col.r;
      pCol[i*3+1] = col.g;
      pCol[i*3+2] = col.b;
    }

    for (let i = 0; i < PC; i++) spawnParticle(i);

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // 4. DECORATIVE OUTER HALOS
    const haloItems = [];
    function addHalo(r, col, rx, rz, op) {
      const pts = [];
      for (let a = 0; a <= Math.PI * 2 + 0.02; a += 0.018)
        pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op });
      const l = new THREE.Line(g, m);
      l.rotation.x = rx; l.rotation.z = rz;
      scene.add(l);
      haloItems.push({g, m});
    }

    addHalo(3.20, 0x00f5ff, Math.PI/2,    0,    0.12);
    addHalo(3.60, 0x9933ea, Math.PI/3,    0.5,  0.08);
    addHalo(4.00, 0x3b82f6, Math.PI/5,    -0.3, 0.05);
    addHalo(1.42, 0x00f5ff, Math.PI/2,    0,    0.20); 
    addHalo(1.55, 0x9933ea, Math.PI/2.5,  0.2,  0.14);

    // 5. BACKGROUND STAR FIELD
    const starPts  = new Float32Array(500 * 3);
    const starCols = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      starPts[i*3]   = (Math.random() - 0.5) * 30;
      starPts[i*3+1] = (Math.random() - 0.5) * 30;
      starPts[i*3+2] = (Math.random() - 0.5) * 30;
      const c = Math.random();
      starCols[i*3] = starCols[i*3+1] = starCols[i*3+2] = c;
    }
    const sG = new THREE.BufferGeometry();
    sG.setAttribute('position', new THREE.BufferAttribute(starPts, 3));
    sG.setAttribute('color',    new THREE.BufferAttribute(starCols, 3));
    const sMat = new THREE.PointsMaterial({
      size: 0.04, vertexColors: true, transparent: true, opacity: 0.5, sizeAttenuation: true
    });
    scene.add(new THREE.Points(sG, sMat));

    // 6. MOUSE PARALLAX
    let mx = 0, my = 0;
    const handleMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. ANIMATION LOOP
    let t = 0;
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      t += 0.008;

      meshSphere.rotation.y =  t * 0.10;
      meshSphere.rotation.x =  t * 0.035;
      meshIco.rotation.y    = -t * 0.08;
      meshIco.rotation.x    =  t * 0.045;

      const pulse = 1 + 0.12 * Math.sin(t * 2.0);
      meshCore.scale.setScalar(pulse);

      orbitObjects.forEach(({ spinGroup, svc }) => {
        spinGroup.rotation.y += svc.speed;
      });

      const pArr = pGeo.attributes.position.array;
      for (let i = 0; i < PC; i++) {
        pArr[i*3]   += pVel[i*3];
        pArr[i*3+1] += pVel[i*3+1];
        pArr[i*3+2] += pVel[i*3+2];
        const d2 = pArr[i*3]**2 + pArr[i*3+1]**2 + pArr[i*3+2]**2;
        if (d2 < 1.25) spawnParticle(i); 
      }
      pGeo.attributes.position.needsUpdate = true;

      camera.position.x += (mx * 0.7  - camera.position.x) * 0.025;
      camera.position.y += (-my * 0.4 + 1.8 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cleanup
      gSphere.dispose(); mSphere.dispose();
      gIco.dispose(); mIco.dispose();
      meshInner.geometry.dispose(); mInner.dispose();
      meshCore.geometry.dispose(); mCore.dispose();
      meshCore2.geometry.dispose(); mCore2.dispose();
      pGeo.dispose(); pMat.dispose();
      sG.dispose(); sMat.dispose();
      
      orbitObjects.forEach(obj => {
        obj.trailGeo.dispose(); obj.trailMat.dispose();
        obj.gNode.dispose(); obj.mNode.dispose();
        obj.gDot.dispose(); obj.mDot.dispose();
        obj.lineGeo.dispose(); obj.lineMat.dispose();
        if(obj.labelTex) obj.labelTex.dispose();
        if(obj.labelMat) obj.labelMat.dispose();
      });

      haloItems.forEach(h => {
        h.g.dispose(); h.m.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent z-10" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

      {/* Center Label Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 select-none flex flex-col items-center">
        <span className="font-[var(--font-body)] text-[0.65rem] tracking-[5px] uppercase text-accent-cyan/80 mb-2 block animate-[fadeUp_1.8s_ease_forwards] opacity-0 translate-y-4">
          Your Brand At The Core
        </span>
        <span className="font-[var(--font-heading)] text-lg md:text-xl font-bold tracking-[3px] uppercase text-white/95 block animate-[fadeUp_2.0s_ease_forwards] opacity-0 translate-y-4">
          Rahul Designs
        </span>
        <span className="font-[var(--font-body)] text-[0.6rem] tracking-[3px] text-white/30 mt-1.5 block animate-[fadeUp_2.2s_ease_forwards] opacity-0 translate-y-4">
          360° Digital Ecosystem
        </span>
      </div>

      {/* Stat Bar Overlay */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-6 md:gap-16 pointer-events-none z-10 animate-[fadeIn_2.5s_ease_1s_forwards] opacity-0">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className="text-2xl md:text-4xl font-bold font-[var(--font-heading)] bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent leading-none">
              {stat.val}{stat.suffix}
            </div>
            <div className="text-[0.6rem] md:text-xs text-white/40 uppercase tracking-[2px] mt-1 md:mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
