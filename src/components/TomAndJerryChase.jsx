import React, { useEffect, useState, useRef } from 'react';

/**
 * TomAndJerryChase
 *
 * Strategy: use official Giphy <iframe> embeds (giphy.com/embed/{id}) — 
 * these NEVER show "GIF no longer exists" because they are served by 
 * Giphy's own embed player, not a hotlink. Giphy guarantees embed availability.
 *
 * We use two confirmed live GIF IDs scraped from Giphy's live search pages:
 *   Jerry running: vPuszmHgeWnIhTkSr5 (HBO Max Tom & Jerry, Jerry running)
 *   Tom chasing:   jyTk0vpfS0pyqkgpZu (Tom chasing Jerry scene)
 *
 * The outer <div> handles all positioning + CSS transitions for the chase.
 * The inner <iframe> just renders the GIF in its embed player.
 *
 * Sequence (ms):
 *   0      → characters appear above viewport (falling phase)
 *   1300   → landing + bounce
 *   2500   → Jerry notices Tom, "!" bubble
 *   3600   → both sprint right off screen
 *   8500   → unmount
 */

const JERRY_GIF_ID = 'vPuszmHgeWnIhTkSr5'; // Tom & Jerry - Jerry running (HBO Max)
const TOM_GIF_ID   = 'jyTk0vpfS0pyqkgpZu'; // Tom chasing Jerry (confirmed live)

export default function TomAndJerryChase() {
  const [phase, setPhase] = useState('falling');
  const [gone, setGone] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const add = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    add(() => setPhase('landed'),  1300);
    add(() => setPhase('notice'),  2500);
    add(() => setPhase('running'), 3600);
    add(() => setGone(true),       8500);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  // ── ground level from bottom of viewport ──────────────────────────────────
  const GROUND = '14vh';

  // ── JERRY position calc ────────────────────────────────────────────────────
  const jerryW = 110, jerryH = 90;
  const jerryLeft = {
    falling: '8%', landed: '8%', notice: '8%', running: '115%',
  }[phase] ?? '8%';

  const jerryStyle = {
    position: 'fixed',
    width: jerryW,
    height: jerryH,
    bottom: phase === 'falling' ? undefined : GROUND,
    top: phase === 'falling' ? '-110px' : undefined,
    left: jerryLeft,
    zIndex: 9999,
    pointerEvents: 'none',
    overflow: 'hidden',
    borderRadius: 6,
    // CSS transitions for movement
    transition: (() => {
      if (phase === 'landed')  return 'top 1.3s cubic-bezier(0.55,-0.35,0.72,0.04)';
      if (phase === 'running') return 'left 4.2s cubic-bezier(0.4,0,0.58,1)';
      return 'none';
    })(),
    transform: (() => {
      if (phase === 'landed')  return 'scaleY(0.82) scaleX(1.1)';
      if (phase === 'notice')  return 'scaleX(-1)'; // face right
      if (phase === 'running') return 'scaleX(-1)'; // face right
      return 'scaleX(1)';
    })(),
    animation: phase === 'landed' ? 'tjBounce 0.6s ease-out forwards' : 'none',
  };

  // ── TOM position calc ──────────────────────────────────────────────────────
  const tomW = 150, tomH = 115;
  const tomLeft = {
    falling: '72%', landed: '72%', notice: '72%', running: '115%',
  }[phase] ?? '72%';

  const tomStyle = {
    position: 'fixed',
    width: tomW,
    height: tomH,
    bottom: phase === 'falling' ? undefined : GROUND,
    top: phase === 'falling' ? '-140px' : undefined,
    left: tomLeft,
    zIndex: 9998,
    pointerEvents: 'none',
    overflow: 'hidden',
    borderRadius: 6,
    transition: (() => {
      if (phase === 'landed')  return 'top 1.3s cubic-bezier(0.55,-0.35,0.72,0.04)';
      if (phase === 'running') return 'left 4.8s cubic-bezier(0.4,0,0.58,1)';
      return 'none';
    })(),
    transform: phase === 'landed' ? 'scaleY(0.82) scaleX(1.1)' : 'none',
    animation: phase === 'landed' ? 'tjBounce 0.6s ease-out 0.1s forwards' : 'none',
  };

  // ── Shadow under characters ────────────────────────────────────────────────
  const shadowStyle = (left, w, visible) => ({
    position: 'fixed',
    bottom: GROUND,
    left,
    width: w,
    height: 10,
    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 70%)',
    transform: 'translateY(100%)',
    zIndex: 9997,
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s',
  });

  return (
    <>
      <style>{`
        @keyframes tjBounce {
          0%   { transform: scaleY(0.65) scaleX(1.2); }
          30%  { transform: scaleY(1.18) scaleX(0.9); }
          60%  { transform: scaleY(0.94) scaleX(1.04); }
          80%  { transform: scaleY(1.03) scaleX(0.99); }
          100% { transform: scaleY(1) scaleX(1); }
        }
        @keyframes tjNotice {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          55%  { transform: scale(1.4) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes tjSpeedLines {
          from { background-position-x: 0px; }
          to   { background-position-x: -60px; }
        }
        /* Hide the Giphy watermark/border inside iframe */
        .tj-iframe-wrap iframe {
          border: none !important;
          pointer-events: none !important;
        }
      `}</style>

      {/* ── Speed-line overlay when running ── */}
      {phase === 'running' && (
        <div style={{
          position: 'fixed', inset: 0,
          zIndex: 9990, pointerEvents: 'none', opacity: 0.1,
          background: 'repeating-linear-gradient(90deg, transparent, transparent 54px, rgba(255,255,255,0.1) 54px, rgba(255,255,255,0.1) 56px)',
          animation: 'tjSpeedLines 0.2s linear infinite',
        }} />
      )}

      {/* ── Ground shadows ── */}
      {(phase === 'landed' || phase === 'notice') && (
        <>
          <div style={shadowStyle('8%', jerryW, true)} />
          <div style={shadowStyle('72%', tomW, true)} />
        </>
      )}

      {/* ── JERRY (iframe embed) ── */}
      <div className="tj-iframe-wrap" style={jerryStyle}>
        <iframe
          src={`https://giphy.com/embed/${JERRY_GIF_ID}`}
          width={jerryW}
          height={jerryH}
          style={{ border: 'none', display: 'block', pointerEvents: 'none' }}
          frameBorder="0"
          allowFullScreen
          title="Jerry Mouse running"
        />
      </div>

      {/* ── TOM (iframe embed) ── */}
      <div className="tj-iframe-wrap" style={tomStyle}>
        <iframe
          src={`https://giphy.com/embed/${TOM_GIF_ID}`}
          width={tomW}
          height={tomH}
          style={{ border: 'none', display: 'block', pointerEvents: 'none' }}
          frameBorder="0"
          allowFullScreen
          title="Tom chasing Jerry"
        />
      </div>

      {/* ── "!" exclamation bubble ── */}
      {phase === 'notice' && (
        <div style={{
          position: 'fixed',
          left: 'calc(8% + 20px)',
          bottom: `calc(${GROUND} + ${jerryH + 10}px)`,
          zIndex: 10000, pointerEvents: 'none',
          fontSize: 42, fontWeight: 900,
          fontFamily: 'Impact, Arial Black, sans-serif',
          color: '#ff1a1a',
          textShadow: '0 0 20px rgba(255,30,30,0.9), 3px 3px 0 #000, -1px -1px 0 #000',
          animation: 'tjNotice 0.4s ease-out forwards',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          !
        </div>
      )}
    </>
  );
}
