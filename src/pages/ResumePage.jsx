import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import { EXPERIENCES, PROFILE, SKILL_CARDS } from '../data/profileData';
import resumePdf from '../public/jain_vismay.pdf';

export default function ResumePage() {
  const { scrollYProgress } = useScroll();
  const documentY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <main className="interior-page">
      <section className="resume-hero">
        <motion.div
          className="grid-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="container resume-hero-layout">
          <div>
            <motion.span
              className="eyebrow-pill"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Sparkles size={14} /> Resume Overview
            </motion.span>

            <div className="hero-title-mask">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                Resume
              </motion.h1>
            </div>

            <motion.p
              className="interior-hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              {PROFILE.summary}
            </motion.p>

            <motion.div
              className="resume-actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href={resumePdf} target="_blank" rel="noreferrer" className="primary-action">
                <ArrowDownToLine size={18} /> Download Resume
              </a>
              <a href={`mailto:${PROFILE.email}`} className="secondary-action">
                Contact <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="resume-orbit"
            style={{ y: documentY }}
            initial={{ opacity: 0, scale: 0.86, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="resume-doc-icon"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FileText size={58} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="resume-content-section">
        <div className="container resume-content-grid">
          <motion.aside
            className="resume-summary-panel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-kicker">Core Stack</span>
            <h2>Systems, agents, retrieval, delivery.</h2>
            <div className="resume-skill-list">
              {SKILL_CARDS.map((skill) => (
                <div key={skill.title}>
                  <strong>{skill.title}</strong>
                  <span>{skill.items.slice(0, 3).join(' / ')}</span>
                </div>
              ))}
            </div>
          </motion.aside>

          <motion.div
            className="resume-pdf-shell"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="resume-pdf-toolbar">
              <span>{PROFILE.name} - Resume</span>
              <a href={resumePdf} target="_blank" rel="noreferrer">
                Open PDF <ArrowUpRight size={14} />
              </a>
            </div>
            <iframe title="Vismay Jain Resume" src={resumePdf} />
          </motion.div>
        </div>
      </section>

      <section className="resume-timeline-section">
        <div className="container">
          <span className="section-kicker">Experience Thread</span>
          <div className="resume-timeline">
            {EXPERIENCES.map((exp, index) => (
              <motion.article
                key={`${exp.company}-${exp.role}`}
                className="resume-timeline-item"
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.65, delay: index * 0.07 }}
              >
                <span>{exp.duration}</span>
                <h3>{exp.role}</h3>
                <p>{exp.company}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
