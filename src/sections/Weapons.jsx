import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { art, Icon, Reveal, SectionHead } from '../components/ui.jsx';

const arsenal = ['sword', 'machete', 'spear', 'bow', 'daggers', 'staff', 'book', 'shield', 'bell'];
const names = ['Sword', 'Machete', 'Spear', 'Bow', 'Daggers', 'Staff', 'Tome', 'Shield', 'Bell'];

export default function Weapons() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const spin = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const counter = useTransform(spin, (v) => -v);
  const heroY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section className="section weapons" id="forge" ref={ref}>
      <div className="container weapons-grid">
        <div className="weapon-wheel-wrap">
          <motion.div className="weapon-wheel" style={{ rotate: spin }}>
            {arsenal.map((w, i) => (
              <div key={w} className="wheel-slot" style={{ '--a': `${(360 / arsenal.length) * i}deg` }}>
                <motion.div style={{ rotate: counter }} className="wheel-icon" title={names[i]}>
                  <Icon name={w} size={46} />
                </motion.div>
              </div>
            ))}
          </motion.div>
          <motion.img className="weapon-hero" src={art('hero-elf')} alt="An elf adventurer with a starwood bow" style={{ y: heroY }} />
          <div className="anvil-glow" />
        </div>

        <div>
          <SectionHead eyebrow="The Tavern Forge" title={<>Nine weapon types. <span className="gold">Every tavern forges its own.</span></>}>
            Swords, bows, staves, tomes, even an enchanted bell. Each tavern's forge sells specials you can't get
            anywhere else, so your home tavern shows in the steel you carry.
          </SectionHead>
          <Reveal className="forge-list" delay={0.1}>
            <div className="forge-item">
              <Icon name="anvil" size={36} />
              <div>
                <b>Forge & upgrade</b>
                <small>Earn tokens by visiting and winning at a tavern, then spend them at its forge.</small>
              </div>
            </div>
            <div className="forge-item">
              <Icon name="gem" size={36} />
              <div>
                <b>Rarities from Common to Mythic</b>
                <small>Rarer weapons are harder to forge and worth the hunt.</small>
              </div>
            </div>
            <div className="forge-item">
              <Icon name="check" size={36} />
              <div>
                <b>Never pay to win</b>
                <small>Weapons are earned, never sold for money. Ever.</small>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
