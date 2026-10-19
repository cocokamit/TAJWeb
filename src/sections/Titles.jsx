import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon, item, SectionHead, Stagger } from '../components/ui.jsx';

const rarity = {
  Common: '#b8b8b8',
  Uncommon: '#6dbe5a',
  Rare: '#4a9ee8',
  Epic: '#b36be8',
  Mythic: '#f2b33d',
};

const titles = [
  { name: 'The Trash', r: 'Common', icon: 'bag' },
  { name: 'The Hermit', r: 'Uncommon', icon: 'lantern' },
  { name: 'The Flower', r: 'Rare', icon: 'sprout' },
  { name: 'The Risker', r: 'Epic', icon: 'target' },
];

function TitleCard({ t }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      variants={item}
      className={`title-card ${flipped ? 'flipped' : ''}`}
      style={{ '--rar': rarity[t.r] }}
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${t.name}, tap to flip`}
    >
      <div className="title-inner">
        <div className="title-face front">
          <span className="rar">{t.r}</span>
          <Icon name={t.icon} size={64} />
          <h3>{t.name}</h3>
          <small>Tap to reveal</small>
        </div>
        <div className="title-face back">
          <Icon name="sparkle" size={36} />
          <p>Its hidden strength is revealed at launch.</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Titles() {
  return (
    <section className="section titles" id="titles">
      <div className="container">
        <SectionHead
          center
          eyebrow="Innate titles"
          title={<>Born with a title. <span className="gold">No title is a bad one.</span></>}
        >
          At creation, fate hands you a random title from five rarity tiers. Even the humblest name hides a strength
          that nobody else has.
        </SectionHead>

        <Stagger className="title-grid">
          {titles.map((t) => (
            <TitleCard key={t.name} t={t} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
