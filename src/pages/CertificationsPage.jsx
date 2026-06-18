import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/profileData';
import awsLogo from '../assets/certifications/aws.png';
import googleLogo from '../assets/certifications/google.png';
import ibmLogo from '../assets/certifications/ibm.png';
import courseraLogo from '../assets/certifications/coursera.png';

const logoMap = {
  AWS: awsLogo,
  'Google Cloud': googleLogo,
  IBM: ibmLogo,
  Coursera: courseraLogo,
};

export default function CertificationsPage() {
  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);

  return (
    <main className="interior-page">
      <section className="cert-hero">
        <motion.div
          className="grid-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="signal-ring signal-ring-one"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="signal-ring signal-ring-two"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container interior-hero-inner">
          <motion.span
            className="eyebrow-pill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles size={14} /> Verified Learning Graph
          </motion.span>

          <div className="hero-title-mask">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              Certifications
            </motion.h1>
          </div>

          <motion.p
            className="interior-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            A focused credential wall across AWS machine learning, Google generative AI,
            IBM analytics, and Python data analysis.
          </motion.p>
        </div>

        <div className="interior-marquee">
          <motion.div style={{ x: marqueeX }}>
            <span>AWS ML</span>
            <span>Generative AI</span>
            <span>Data Analysis</span>
            <span>Python</span>
            <span>Cloud Practice</span>
          </motion.div>
        </div>
      </section>

      <section className="cert-grid-section">
        <div className="container cert-grid">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.article
              key={cert.title}
              className="cert-card"
              initial={{ opacity: 0, y: 70, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, borderColor: 'rgba(173, 255, 47, 0.45)' }}
            >
              <div className="cert-card-top">
                <motion.div
                  className="cert-logo-wrap"
                  whileHover={{ rotate: 8, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  <img src={logoMap[cert.issuer]} alt={`${cert.issuer} logo`} />
                </motion.div>
                <span>
                  <BadgeCheck size={14} /> {cert.issuer}
                </span>
              </div>

              <div>
                <h2>{cert.title}</h2>
                <p>{cert.description}</p>
              </div>

              <a href={cert.certLink} target="_blank" rel="noreferrer" className="cert-link">
                View Certificate <ArrowUpRight size={16} />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="proof-strip">
        <div className="container proof-strip-inner">
          {['Machine Learning', 'Cloud', 'Analytics', 'Python', 'GenAI'].map((item, index) => (
            <motion.div
              key={item}
              className="proof-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <ShieldCheck size={18} />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
