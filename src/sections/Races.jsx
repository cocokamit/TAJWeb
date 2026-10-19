import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { art, SectionHead } from '../components/ui.jsx';

const races = [
  { id: 'human', name: 'Human', line: 'Adaptable and quick to learn. Grows a little faster than everyone else.', tint: '#e25d5d' },
  { id: 'elf', name: 'Elf', line: 'Forest-born archers who feel at home in parks and green places.', tint: '#6dbe5a' },
  { id: 'dwarf', name: 'Dwarf', line: 'Stubborn as stone. Hard to knock down, harder to keep down.', tint: '#c9a36a' },
  { id: 'beastkin', name: 'Beastkin', line: 'Sharp instincts and quicker reflexes than anyone at the table.', tint: '#e8a23a' },
  { id: 'fae', name: 'Fae', line: 'Tiny, glimmering and brimming with magic from the first turn.', tint: '#e48ad8' },
  { id: 'giant', name: 'Giant', line: 'Mountain-born. Takes a hit like a castle wall.', tint: '#8fa3c0' },
  { id: 'vampire', name: 'Vampire', line: 'Elegant, nocturnal, and healed by every blow they land.', tint: '#b33a4a' },
  { id: 'orc', name: 'Orc', line: 'Fury rises as the fight turns. Most dangerous when cornered.', tint: '#5fae7d' },
  { id: 'merfolk', name: 'Merfolk', line: 'Tide-blessed casters whose water magic hits hardest.', tint: '#4a9ee8' },
];

// Vertical scroll drives a horizontal gallery while the section is pinned.
export default function Races() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const track = useRef(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const measure = () => setShift(Math.max(0, track.current.scrollWidth - window.innerWidth + 32));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -shift]);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="races" id="races" ref={ref}>
      <div className="races-sticky">
        <div className="container">
          <SectionHead eyebrow="Nine races" title={<>Who will <span className="gold">you</span> become?</>}>
            Every race has its own starter skills and a gift that changes how you fight. Then make them yours with
            hairstyles, outfits, crowns, capes and colours.
          </SectionHead>
        </div>
        <motion.div className="races-track" ref={track} style={{ x }}>
          {races.map((r) => (
            <article key={r.id} className="race-card" style={{ '--tint': r.tint }}>
              <div className="race-art">
                <img src={art(`hero-${r.id}`)} alt={`${r.name} adventurer`} loading="lazy" />
              </div>
              <h3>{r.name}</h3>
              <p>{r.line}</p>
            </article>
          ))}
        </motion.div>
        <div className="container">
          <div className="races-progress">
            <motion.i style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
