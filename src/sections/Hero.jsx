import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { art } from '../components/ui.jsx';

const Hero3D = lazy(() => import('../components/Hero3D.jsx'));

const words = ['Your', 'city', 'is', 'the', 'realm.'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div className="hero-bg" style={{ scale: canvasScale }}>
        <Suspense fallback={<div className="hero-canvas fallback" />}>
          <Hero3D />
        </Suspense>
      </motion.div>
      <div className="hero-vignette" />

      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: textY, opacity: fade }}>
          <motion.span
            className="pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="dot" /> Android playtest · coming soon
          </motion.span>
          <h1>
            {words.map((w, i) => (
              <motion.span
                key={w}
                className={`word ${i === 4 ? 'gold' : ''}`}
                initial={{ opacity: 0, y: 60, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <b>The Adventurer's Journey</b> is a fantasy RPG on the real map. Local cafés become
            taverns, every player is born with a one-of-a-kind title, and your next quest is a
            short walk away.
          </motion.p>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <a href="#join" className="btn btn-primary">Join the playtest</a>
            <a href="#taverns" className="btn btn-ghost">I own a café →</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-art"
          style={{ y: heroY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-halo" />
          <img className="hero-main float-slow" src={art('hero-champion')} alt="A crowned adventurer with a spear" />
          <img className="hero-side left float-mid" src={art('hero-fae')} alt="" />
          <img className="hero-side right float-fast" src={art('hero-orc')} alt="" />
        </motion.div>
      </div>

      <a href="#how" className="scroll-cue" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
