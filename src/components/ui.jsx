import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const art = (name) => `/art/${name}.svg`;

export function Icon({ name, size = 28, className = '', alt = '' }) {
  return <img src={art(`icon-${name}`)} width={size} height={size} alt={alt} className={className} loading="lazy" />;
}

const ease = [0.22, 1, 0.36, 1];

// Fades and lifts its children into place the first time they scroll into view.
export function Reveal({ children, delay = 0, y = 40, x = 0, className = '', as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </M>
  );
}

// Children animate in one after another.
export function Stagger({ children, className = '', gap = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

export function SectionHead({ eyebrow, title, children, center = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2>{title}</h2>
      </Reveal>
      {children && (
        <Reveal delay={0.16}>
          <p className="lead">{children}</p>
        </Reveal>
      )}
    </div>
  );
}

// Counts up from zero when scrolled into view.
export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);
  useEffect(() => spring.on('change', (v) => setValue(Math.round(v))), [spring]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

// A card that tilts toward the pointer.
export function TiltCard({ children, className = '', max = 10 }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
    ref.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }
  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
