import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, Calendar, Cpu, Brain, Layers, Network, Sparkles, Terminal } from 'lucide-react';
import Header from './components/Header';
import ThreeBackground from './components/ThreeBackground';
import HangingIDCard from './components/HangingIDCard';
import Chatbot from './components/Chatbot';
import CertificationsPage from './pages/CertificationsPage';
import ResumePage from './pages/ResumePage';
import { PROJECTS, SKILL_CARDS, EXPERIENCES } from './data/profileData';

// Custom hook to detect mobile screens
function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}
// import TomAndJerryChase from './components/TomAndJerryChase';

// Helper component for standard scroll-reveal animations
function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const path = window.location.pathname;

  if (path === '/certifications') {
    return (
      <>
        <Header />
        <CertificationsPage />
      </>
    );
  }

  if (path === '/resume') {
    return (
      <>
        <Header />
        <ResumePage />
      </>
    );
  }

  return (
    <>
      {/* <TomAndJerryChase /> */}
      <Header />
      <main style={{ position: 'relative' }}>
        {/* HERO SECTION */}
        <HeroSection />

        {/* WORK SECTION (STACKING CARDS) */}
        <WorkSection />

        {/* SKILLS SECTION (HORIZONTAL SCROLL ON VERTICAL SCROLL) */}
        <SkillsSection />

        {/* EXPERIENCE SECTION */}
        <ExperienceSection />

        {/* FOOTER & CONTACT */}
        <FooterSection scrollYProgress={scrollYProgress} />
      </main>
      <Chatbot />
    </>
  );
}

// ---------------- HERO SECTION ----------------
function HeroSection() {
  return (
    <section id="home" style={{ minHeight: '100vh', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
      <ThreeBackground />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ marginBottom: '24px' }}
        >
          <span style={{
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--bg-accent-green)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(173, 255, 47, 0.3)',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(173, 255, 47, 0.05)',
          }}>
            GenAI Engineer
          </span>
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(44px, 8vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
            }}
          >
            Vismay Jain<br />
            <span style={{ color: 'var(--text-secondary)' }}>Agentic Systems</span>
            <br />
            & Automation.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            maxWidth: '650px',
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          GenAI Engineer specializing in enterprise-grade agentic frameworks, large language model fine-tuning, and production-ready RAG architectures. Building high-performance AI tools with observability and cost optimization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#work"
            style={{
              textDecoration: 'none',
              color: 'var(--text-dark)',
              backgroundColor: 'var(--bg-accent-green)',
              padding: '18px 36px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 30px rgba(173, 255, 47, 0.2)',
            }}
          >
            Projects <ArrowUpRight size={18} />
          </a>
          <a
            href="#contact"
            className="glass"
            style={{
              textDecoration: 'none',
              color: 'var(--text-primary)',
              padding: '18px 36px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Connect / Contact
          </a>
        </motion.div>

        <HangingIDCard />
      </div>
    </section>
  );
}

// ---------------- WORK SECTION (STACKING CARDS) ----------------
function WorkSection() {
  return (
    <section id="work" style={{ position: 'relative', padding: '100px 0', borderBottom: 'none', backgroundColor: '#0a0a0a' }}>
      <div className="container" style={{ padding: '0 10%' }}>
        <ScrollReveal>
          <div style={{ marginBottom: '60px' }}>
            <span style={{ fontSize: '14px', color: 'var(--bg-accent-green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              AI Projects & Architectures
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', textTransform: 'uppercase', marginTop: '10px' }}>
              Selected Key Works
            </h2>
          </div>
        </ScrollReveal>

        {/* Stacked Cards Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative' }}>
          {PROJECTS.map((proj, idx) => {
            return <ProjectCard key={proj.id} project={proj} index={idx} total={PROJECTS.length} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }) {
  const containerRef = useRef(null);
  const isMobile = useMobile();
  const stickyTop = isMobile ? 80 : 120 + index * 40;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        width: '100%',
        minHeight: isMobile ? '340px' : '450px',
        marginBottom: index === total - 1 ? '100px' : '0px',
      }}
    >
      <ScrollReveal delay={0.1 * index}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            minHeight: isMobile ? '340px' : '450px',
            borderRadius: isMobile ? '24px' : '32px',
            backgroundColor: project.color,
            color: project.textColor,
            padding: isMobile ? '32px 24px' : '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          }}
          whileHover={isMobile ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', width: '100%', gap: isMobile ? '16px' : '0' }}>
            <div>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
                {project.category}
              </span>
              <h3 style={{ fontSize: 'clamp(24px, 4vw, 44px)', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.1 }}>
                {project.title}
              </h3>
            </div>
            <div style={{
              border: '2px solid currentColor',
              borderRadius: '50%',
              width: isMobile ? '48px' : '60px',
              height: isMobile ? '48px' : '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ExternalLink size={isMobile ? 18 : 24} />
            </div>
          </div>

          <div style={{ maxWidth: '650px', alignSelf: 'flex-start', marginTop: isMobile ? '24px' : '0' }}>
            <p style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 400, opacity: 0.9, marginBottom: '24px', lineHeight: 1.5 }}>
              {project.desc}
            </p>
            <a
              href={project.link}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderBottom: '2px solid currentColor',
                paddingBottom: '4px',
              }}
            >
              Visit Repository
            </a>
          </div>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}

// ---------------- SKILLS SECTION (HORIZONTAL SCROLL ON VERTICAL SCROLL) ----------------
const SKILL_ICONS = {
  'Generative AI': <Brain size={32} />,
  'Model Tuning': <Cpu size={32} />,
  'Vector Databases': <Layers size={32} />,
  Observability: <Terminal size={32} />,
  'Backend Engineering': <Network size={32} />,
  'Cloud & DevOps': <Sparkles size={32} />,
};

function SkillsSection() {
  const containerRef = useRef(null);
  const isMobile = useMobile();

  // Measure scroll progress relative to this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  // Map vertical scroll progress to horizontal translation
  // Adjust -70% depending on the number of items and card widths to fit all cards cleanly
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['0%', '-62%']);

  return (
    <div
      id="skills"
      ref={containerRef}
      style={{
        position: 'relative',
        height: isMobile ? 'auto' : '300vh', // High height on desktop to capture vertical scroll
        backgroundColor: 'var(--bg-secondary)',
        padding: isMobile ? '80px 0' : '0',
      }}
    >
      {/* Sticky container wrapping the carousel view */}
      <div style={{
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        height: isMobile ? 'auto' : '100vh',
        width: '100%',
        overflow: isMobile ? 'visible' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '0 20px' : '0 10%',
      }}>

        {/* Title */}
        <ScrollReveal>
          <div style={{ marginBottom: isMobile ? '30px' : '50px' }}>
            <span style={{ fontSize: '14px', color: 'var(--bg-accent-green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              My Core Capabilities
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', textTransform: 'uppercase', marginTop: '10px' }}>
              Core Capabilities
            </h2>
          </div>
        </ScrollReveal>

        {/* Carousel Viewport Wrapper */}
        <div
          className={isMobile ? "skills-carousel-container" : ""}
          style={{ width: '100%', overflow: isMobile ? 'auto' : 'visible' }}
        >
          <motion.div
            className={isMobile ? "skills-carousel-track" : ""}
            style={{
              display: 'flex',
              gap: isMobile ? '20px' : '40px',
              x: isMobile ? 0 : xTranslate, // Translate horizontally only on desktop
              width: 'max-content',
              paddingBottom: isMobile ? '20px' : '0',
            }}
          >
            {SKILL_CARDS.map((card, idx) => (
              <motion.div
                key={idx}
                className={`glass ${isMobile ? "skills-card-mobile" : ""}`}
                style={{
                  width: isMobile ? '280px' : '380px',
                  minHeight: isMobile ? '240px' : '280px',
                  padding: isMobile ? '30px 24px' : '40px 30px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  flexShrink: 0,
                }}
                whileHover={isMobile ? undefined : {
                  y: -8,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderColor: 'var(--bg-accent-green)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ color: 'var(--bg-accent-green)', marginBottom: '20px' }}>
                  {SKILL_ICONS[card.title]}
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                  {card.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {card.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        display: 'block',
                      }}
                    >
                      • {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ---------------- EXPERIENCE SECTION ----------------
function ExperienceSection() {
  return (
    <section id="experience" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: '80px' }}>
            <span style={{ fontSize: '14px', color: 'var(--bg-accent-green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Professional Path
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', textTransform: 'uppercase', marginTop: '10px' }}>
              Work History
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Vertical Center Line */}
          <div style={{
            position: 'absolute',
            left: '30px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--border-color)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '40px', position: 'relative' }}>
                {/* Center Circle Indicator */}
                <div style={{
                  position: 'absolute',
                  left: '21px',
                  top: '6px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '4px solid var(--bg-accent-green)',
                  zIndex: 2,
                }} />

                <ScrollReveal delay={0.1 * idx}>
                  <div style={{ paddingLeft: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--bg-accent-green)',
                        border: '1px solid rgba(173,255,47,0.3)',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        <Calendar size={12} /> {exp.duration}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
                        {exp.company}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '16px' }}>
                      {exp.role}
                    </h3>

                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', listStyleType: 'square' }}>
                      {exp.desc.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: '8px', lineHeight: 1.5, fontSize: '15px' }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- FOOTER & CONTACT SECTION ----------------
function FooterSection({ scrollYProgress }) {
  const isMobile = useMobile();
  const xTranslation = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -300 : -900]);

  return (
    <section id="contact" style={{ backgroundColor: '#000', padding: isMobile ? '60px 0 30px 0' : '100px 0 40px 0', borderBottom: 'none' }}>
      {/* Scroll responsive marquee */}
      <div style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: isMobile ? '30px' : '60px',
        marginBottom: isMobile ? '40px' : '60px',
      }}>
        <motion.div
          style={{
            display: 'inline-flex',
            fontSize: 'clamp(44px, 8vw, 150px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
            gap: isMobile ? '40px' : '80px',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.15)',
            x: xTranslation,
          }}
        >
          <span>BUILDING ENTERPRISE AGENTS — SHAPING GENAI —</span>
          <span>BUILDING ENTERPRISE AGENTS — SHAPING GENAI —</span>
        </motion.div>
      </div>

      <div className="container" style={{ padding: '0 6%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '40px' : '60px', marginBottom: isMobile ? '40px' : '80px' }}>
          <div>
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', textTransform: 'uppercase', marginBottom: '24px' }}>
                Let's build<br />intelligent systems.
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '380px' }}>
                Interested in agentic architectures, RAG solutions, or custom fine-tuning projects? Let's connect.
              </p>
              <div style={{ color: 'var(--text-primary)', marginBottom: '32px', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>Email: <a href="mailto:ai20.vismay.jain@gmail.com" style={{ color: 'var(--bg-accent-green)', textDecoration: 'none' }}>ai20.vismay.jain@gmail.com</a></div>
                <div>Phone: <a href="tel:+916351464527" style={{ color: 'var(--bg-accent-green)', textDecoration: 'none' }}>+91 6351464527</a></div>
              </div>
            </ScrollReveal>

            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="https://github.com/VISMAY7890" target="_blank" rel="noreferrer" className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/vismay-jain-a06b0b203/" target="_blank" rel="noreferrer" className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <Linkedin size={20} />
              </a>
              <a href="mailto:ai20.vismay.jain@gmail.com" className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <ScrollReveal delay={0.2}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = e.target.elements.name.value;
                  const email = e.target.elements.email.value;
                  const message = e.target.elements.message.value;
                  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
                  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ai20.vismay.jain@gmail.com&su=${subject}&body=${body}`, '_blank');
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="glass"
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@domain.com"
                    className="glass"
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Message</label>
                  <textarea
                    name="message"
                    placeholder="Describe your AI agent scope or engineering project..."
                    rows={4}
                    className="glass"
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'none',
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="glass"
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-accent-green)',
                    color: 'var(--text-dark)',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Send Query
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Vismay Jain. All rights reserved.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Thanks For Visiting
          </p>
        </div>
      </div>
    </section>
  );
}
