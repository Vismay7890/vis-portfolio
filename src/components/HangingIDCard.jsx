import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import vismayImg from '../public/Vismay.jpg';

export default function HangingIDCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  // Drag offsets
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Springs for smooth drag return (physical elastic band effect)
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(dragX, springConfig);
  const y = useSpring(dragY, springConfig);

  // 3D tilt values on hover
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  // Rotate based on horizontal drag distance to simulate string swing angle
  const rotateZ = useTransform(x, [-200, 200], [-30, 30]);

  // Combine drag rotation and mouse hover tilt rotation
  const combinedRotateY = useTransform([x, rotateY], ([latestX, latestRotY]) => {
    // Basic swing rotation from drag
    const dragRotY = (latestX / 200) * 15;
    // Toggled flip angle + mouse hover tilt
    const baseFlip = isFlipped ? 180 : 0;
    // Combine them
    return baseFlip + dragRotY + latestRotY;
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Get mouse position relative to card center
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    // Calculate rotation angles (max tilt: 25 degrees)
    const maxTilt = 25;
    const rX = -(mouseY / (rect.height / 2)) * maxTilt;
    const rY = (mouseX / (rect.width / 2)) * maxTilt;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className="hanging-card-container"
      style={{
        position: 'fixed',
        top: 0,
        right: '60px',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        perspective: '1000px',
      }}
    >
      {/* Lanyard Line (Dynamic SVG connecting top of screen to the clip) */}
      <svg
        style={{
          width: '200px',
          height: '120px',
          position: 'absolute',
          top: 0,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        <motion.path
          d={useTransform([x, y], ([latestX, latestY]) => {
            const clipX = 100 + latestX;
            const clipY = 100 + latestY;
            return `M 100,0 Q ${100 + latestX * 0.4},${clipY * 0.5} ${clipX},${clipY}`;
          })}
          fill="none"
          stroke="#adff2f"
          strokeWidth="2.5"
          opacity="0.6"
          strokeDasharray="4 2"
        />
      </svg>

      {/* The Draggable Wrapper */}
      <motion.div
        drag
        dragConstraints={{ left: -150, right: 150, top: 0, bottom: 200 }}
        dragElastic={0.4}
        onDragEnd={() => {
          dragX.set(0);
          dragY.set(0);
        }}
        style={{
          x,
          y,
          rotateZ,
          rotateX,
          rotateY: combinedRotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          cursor: 'grab',
          marginTop: '100px',
          pointerEvents: 'auto',
        }}
        whileDrag={{ cursor: 'grabbing' }}
        transition={{ type: 'spring', ...springConfig }}
      >
        {/* Metal Card Clip */}
        <div
          style={{
            width: '28px',
            height: '16px',
            backgroundColor: '#333',
            border: '2px solid #555',
            borderRadius: '4px 4px 0 0',
            position: 'absolute',
            top: '-16px',
            left: 'calc(50% - 14px)',
            transform: 'translateZ(10px)',
          }}
        />

        {/* Card Container (3D Hover-Tilt & Flip Effect) */}
        <div
          ref={cardRef}
          onClick={() => setIsFlipped(!isFlipped)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '200px',
            height: '280px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* FRONT SIDE */}
          <div
            className="glass"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              borderRadius: '16px',
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(10, 10, 10, 0.9)',
              border: '1px solid rgba(173, 255, 47, 0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: '8px', fontWeight: 700, color: 'var(--bg-accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Core Agent
              </span>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-accent-green)', boxShadow: '0 0 6px var(--bg-accent-green)' }} />
            </div>

            <div style={{ width: '95px', height: '95px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--bg-accent-green)', backgroundColor: '#121212' }}>
              <img src={vismayImg} alt="Vismay Jain" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                VISMAY JAIN
              </h4>
              <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                GenAI Engineer
              </p>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(173, 255, 47, 0.2), transparent)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.4)' }}>
              <span>ID: #50931</span>
              <span style={{ color: 'var(--bg-accent-green)' }}>ONLINE</span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div
            className="glass"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '16px',
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 15, 15, 0.95)',
              border: '1px solid rgba(173, 255, 47, 0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ textAlign: 'center', width: '100%' }}>
              <span style={{ fontSize: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                System Access Credentials
              </span>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
              <div style={{
                width: '32px',
                height: '24px',
                background: 'linear-gradient(135deg, #ffd700 0%, #cca300 100%)',
                borderRadius: '4px',
                border: '1px solid rgba(0,0,0,0.2)',
                position: 'relative',
              }} />

              <div style={{ fontFamily: 'monospace', fontSize: '9px', color: 'var(--text-secondary)', textAlign: 'left', width: '100%', lineHeight: 1.4 }}>
                <div>AUTH: APPROVED</div>
                <div>LANGUAGES: PY/TS/C#</div>
                <div>FRAMEWORK: LANGGRAPH</div>
                <div>ACCESS_LVL: ROOT</div>
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '100%',
                height: '24px',
                background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 2px, #000 2px, #000 4px, #fff 4px, #fff 5px, #000 5px, #000 8px)',
                borderRadius: '2px',
              }} />
              <span style={{ fontSize: '8px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                *GENAI-ENGINEER-VISMAY*
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
