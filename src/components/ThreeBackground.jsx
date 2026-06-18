import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    
    // Position camera slightly tilted down to view the terrain manifold in perspective
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, -65, 80);
    camera.lookAt(0, 0, 10);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. Ambient & Point Lighting for wireframe glow accents
    const ambientLight = new THREE.AmbientLight(0x0a0a0a);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xadff2f, 2, 200);
    pointLight.position.set(0, 0, 40);
    scene.add(pointLight);

    // 4. Mathematical Loss Landscape Grid (Manifold)
    const gridWidth = 220;
    const gridHeight = 220;
    const segmentsX = 70;
    const segmentsY = 70;

    const geometry = new THREE.PlaneGeometry(gridWidth, gridHeight, segmentsX, segmentsY);

    // Custom material: Wireframe with acid green color matching the UI theme
    const material = new THREE.MeshBasicMaterial({
      color: 0xadff2f,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const terrain = new THREE.Mesh(geometry, material);
    scene.add(terrain);

    // Store original Z coordinates for wave offsets
    const count = geometry.attributes.position.count;
    const originalZ = new Float32Array(count);
    const posAttribute = geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      originalZ[i] = posAttribute.getZ(i);
    }

    // Interactive Mouse Coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      // Map coordinates to fit plane landscape dimensions
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * gridWidth - gridWidth / 2;
      mouse.targetY = -((e.clientY - rect.top) / rect.height) * gridHeight + gridHeight / 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 5. Physics Deformation & Wave Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly transition mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const pos = geometry.attributes.position;

      // Update Z coordinate of each vertex on the landscape plane
      for (let i = 0; i < count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);

        // A. Natural Mathematical Waves (Multi-frequency thinking manifolds)
        // Combine sine/cosine waves to simulate dynamic flowing math surfaces
        let z = Math.sin(vx * 0.05 + elapsedTime * 0.8) * Math.cos(vy * 0.05 + elapsedTime * 0.8) * 8;
        z += Math.sin(vx * 0.1 - elapsedTime * 0.4) * 2;

        // B. Interactive Cursor Gravity/Optimizing Valley
        if (mouse.active) {
          const dx = vx - mouse.x;
          const dy = vy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInfluence = 50; // Radius of mouse deformation

          if (dist < maxInfluence) {
            // Apply a smooth bell curve gravity/optimization drop (Loss Valley)
            const influence = (maxInfluence - dist) / maxInfluence; // 0 to 1
            const drop = Math.sin(influence * Math.PI / 2) * 24; // Deform down up to 24 units
            z -= drop;
          }
        }

        pos.setZ(i, z);
      }

      pos.needsUpdate = true;

      // Dynamic light tracking mouse location
      if (mouse.active) {
        pointLight.position.x = mouse.x;
        pointLight.position.y = mouse.y;
        pointLight.position.z = 25;
      } else {
        // Default floating light trajectory
        pointLight.position.x = Math.sin(elapsedTime) * 40;
        pointLight.position.y = Math.cos(elapsedTime) * 40;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
