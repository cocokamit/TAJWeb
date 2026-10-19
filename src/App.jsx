import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { art } from './components/ui.jsx';
import Hero from './sections/Hero.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import Races from './sections/Races.jsx';
import Titles from './sections/Titles.jsx';
import Weapons from './sections/Weapons.jsx';
import Taverns from './sections/Taverns.jsx';
import { Faq, Footer, Join, Marquee, Safety, Stats } from './sections/Rest.jsx';

const links = [
  ['How it works', '#how'],
  ['Races', '#races'],
  ['Titles', '#titles'],
  ['For cafés', '#taverns'],
  ['FAQ', '#faq'],
];

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    // Anchor links glide instead of jumping.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
}

function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setSolid(y > 40);
  });
  return (
    <motion.header
      className={`nav ${solid ? 'solid' : ''} ${open ? 'open' : ''}`}
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <img src={art('venue-tavern')} alt="" width={34} height={34} />
          <span>
            The Adventurer's <em>Journey</em>
          </span>
        </a>
        <nav className="nav-links">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
        </nav>
        <a href="#join" className="btn btn-primary btn-sm nav-cta">
          Join
        </a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>
      <motion.div className="nav-progress" style={{ scaleX: progress }} />
    </motion.header>
  );
}

export default function App() {
  useSmoothScroll();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Races />
        <Titles />
        <Weapons />
        <Stats />
        <Taverns />
        <Safety />
        <Faq />
        <Join />
      </main>
      <Footer />
    </>
  );
}
