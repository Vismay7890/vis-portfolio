import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e) => {
      if (cursorRef.current) {
        // Position centering offsets
        const size = hovered ? (cursorText ? 80 : 48) : 32;
        const x = e.clientX - size / 2;
        const y = e.clientY - size / 2;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else if (e.target.closest('a, button, [role="button"], [drag]')) {
        setHovered(true);
        setCursorText('');
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [hovered, cursorText]);

  if (isMobile) return null;

  const size = hovered ? (cursorText ? '80px' : '48px') : '32px';

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: hovered && !cursorText ? 'rgba(255, 255, 255, 1)' : 'transparent',
        border: hovered && !cursorText ? 'none' : '2px solid var(--bg-accent-green)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: hovered && !cursorText ? 'difference' : 'normal',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontSize: '10px',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        fontFamily: 'var(--font-display)',
        backdropFilter: cursorText ? 'blur(4px)' : 'none',
        background: cursorText ? 'rgba(173, 255, 47, 0.9)' : undefined,
        // CSS transitions for smooth size and background swaps, position translation is handled in requestAnimationFrame path
        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border 0.2s',
        willChange: 'transform',
      }}
    >
      {cursorText && (
        <span
          style={{
            animation: 'fadeIn 0.2s ease-out forwards',
          }}
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}
