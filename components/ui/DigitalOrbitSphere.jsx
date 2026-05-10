'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DigitalOrbitSphere() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    // Internal resolution
    const W = 480;
    const H = 480;
    canvas.width = W;
    canvas.height = H;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H, false); // false = don't update CSS style
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Colors
    const CYAN = 0x00f5ff;
    const PURPLE = 0x9933ea;
    const BLUE = 0x3b82f6;
    const CYAN_S = new THREE.Color(CYAN);
    const PURPLE_S = new THREE.Color(PURPLE);
    const BLUE_S = new THREE.Color(BLUE);

    // Central Orb
    const geoOrb = new THREE.IcosahedronGeometry(0.92, 3);
    const matOrb = new THREE.MeshBasicMaterial({
      color: CYAN,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const meshOrb = new THREE.Mesh(geoOrb, matOrb);
    scene.add(meshOrb);

    const geoInner = new THREE.SphereGeometry(0.55, 32, 32);
    const matInner = new THREE.MeshBasicMaterial({
      color: 0x040020,
      transparent: true,
      opacity: 0.92,
    });
    const meshInner = new THREE.Mesh(geoInner, matInner);
    scene.add(meshInner);

    // Ring factory
    function makeRing(radius, tubeR, color, rotX, rotY, rotZ, opacity = 1) {
      const geo = new THREE.TorusGeometry(radius, tubeR, 8, 96);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(rotX, rotY, rotZ);
      return mesh;
    }

    const ring1 = makeRing(1.42, 0.016, CYAN, Math.PI / 2, 0, 0, 1.0);
    const ring2 = makeRing(1.42, 0.016, PURPLE, 0, Math.PI / 6, Math.PI / 4, 0.9);
    const ring3 = makeRing(1.42, 0.016, BLUE, Math.PI / 3, Math.PI / 3, Math.PI / 2, 0.85);

    const halo1 = makeRing(1.72, 0.006, CYAN, Math.PI / 2.4, 0.2, 0.1, 0.35);
    const halo2 = makeRing(1.65, 0.006, PURPLE, 0.3, Math.PI / 2.4, 0.5, 0.30);

    const pivot1 = new THREE.Group(); pivot1.add(ring1); scene.add(pivot1);
    const pivot2 = new THREE.Group(); pivot2.add(ring2); scene.add(pivot2);
    const pivot3 = new THREE.Group(); pivot3.add(ring3); scene.add(pivot3);
    const pivotH1 = new THREE.Group(); pivotH1.add(halo1); scene.add(pivotH1);
    const pivotH2 = new THREE.Group(); pivotH2.add(halo2); scene.add(pivotH2);

    // Nodes
    function makeNode(color, size = 0.065) {
      const g = new THREE.SphereGeometry(size, 8, 8);
      const m = new THREE.MeshBasicMaterial({ color });
      return new THREE.Mesh(g, m);
    }

    const nodes1 = [];
    [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach(angle => {
      const n = makeNode(CYAN, 0.072);
      nodes1.push({ mesh: n, angle, speed: 0.008 });
      scene.add(n);
    });

    const nodes2 = [];
    [0, Math.PI, Math.PI / 2].forEach(angle => {
      const n = makeNode(PURPLE, 0.065);
      nodes2.push({ mesh: n, angle, speed: -0.006 });
      scene.add(n);
    });

    const nodes3 = [];
    [0, (Math.PI * 2) / 3].forEach(angle => {
      const n = makeNode(BLUE, 0.060);
      nodes3.push({ mesh: n, angle, speed: 0.005 });
      scene.add(n);
    });

    const R = 1.42;
    function positionNode(node, ringMesh) {
      const localPos = new THREE.Vector3(
        Math.cos(node.angle) * R,
        Math.sin(node.angle) * R,
        0
      );
      localPos.applyEuler(ringMesh.rotation);
      node.mesh.position.copy(localPos);
      node.angle += node.speed;
    }

    // Particles
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 1.4;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      const col = new THREE.Color().lerpColors(CYAN_S, PURPLE_S, mix);
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambLight);

    let mouseX = 0;
    let mouseY = 0;
    
    // Using containerRef for hover parallax to be localized
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };
    
    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener('mousemove', handleMouseMove);
    currentContainer.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;
    let t = 0;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      t += 0.008;

      const targetX = mouseY * 0.18;
      const targetY = mouseX * 0.18;
      scene.rotation.x += (targetX - scene.rotation.x) * 0.05;
      scene.rotation.y += (targetY + t * 0.18 - scene.rotation.y) * 0.05;

      pivot1.rotation.y = t * 0.22;
      pivot2.rotation.x = t * 0.17;
      pivot3.rotation.z = t * 0.14;
      pivotH1.rotation.y = -t * 0.09;
      pivotH2.rotation.x = t * 0.07;

      matOrb.opacity = 0.18 + 0.10 * Math.sin(t * 1.2);
      meshOrb.rotation.x = t * 0.08;
      meshOrb.rotation.y = -t * 0.12;

      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.015;

      nodes1.forEach(n => positionNode(n, ring1));
      nodes2.forEach(n => positionNode(n, ring2));
      nodes3.forEach(n => positionNode(n, ring3));

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      currentContainer.removeEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup geometries and materials
      geoOrb.dispose();
      matOrb.dispose();
      geoInner.dispose();
      matInner.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-[400px] aspect-square group">
      {/* Glow rings translated from CSS */}
      <div className="absolute rounded-full border-[1.5px] border-accent-cyan/15 pointer-events-none animate-pulse-ring" style={{ width: '70%', height: '70%' }} />
      <div className="absolute rounded-full border-[1.5px] border-accent-purple/10 pointer-events-none animate-pulse-ring" style={{ width: '85%', height: '85%', animationDelay: '1s' }} />
      <div className="absolute rounded-full border-[1.5px] border-accent-cyan/5 pointer-events-none animate-pulse-ring" style={{ width: '100%', height: '100%', animationDelay: '2s' }} />
      
      <canvas ref={canvasRef} className="w-full h-full block z-10 transition-transform duration-700 group-hover:scale-105" />
      
      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
