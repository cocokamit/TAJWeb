import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { art, CountUp, Icon, item, Reveal, SectionHead, Stagger } from '../components/ui.jsx';
import { SIGNUP_ENDPOINT } from '../config.js';

export function Marquee() {
  const words = [
    'The Hermit', 'Elf', 'Tavern Night', 'The Flower', 'Dwarf', 'Fireball', 'The Risker', 'Merfolk',
    'Tavern Champions', 'The Trash', 'Vampire', 'Dragonscale Spear', 'Fae', 'Moonlight Bell', 'Orc',
  ];
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>
            {w} <Icon name="sparkle" size={18} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  const stats = [
    { n: 9, s: '', l: 'races to play' },
    { n: 50, s: '+', l: 'innate titles' },
    { n: 9, s: '', l: 'weapon types' },
    { n: 6, s: '', l: 'ranks, Novice to Mythic' },
  ];
  return (
    <section className="stats">
      <Stagger className="container stats-grid">
        {stats.map((s) => (
          <motion.div key={s.l} variants={item} className="stat">
            <b>
              <CountUp to={s.n} suffix={s.s} />
            </b>
            <span>{s.l}</span>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

export function Safety() {
  const points = [
    ['pin', 'No live location sharing', 'Other players never see where you are. Only an optional "checked in at a tavern".'],
    ['tavern', 'Public, verified venues', 'Battles only happen at real, owner-verified places, never in someone\'s street.'],
    ['shield', 'Teen Mode (13–17)', 'Parental consent, no private messages with adults, presence hidden by default.'],
    ['warning', 'Report & block', 'Moderation tools are in from day one, not bolted on later.'],
  ];
  return (
    <section className="section safety" id="safety">
      <div className="container safety-grid">
        <SectionHead eyebrow="Safe by design" title={<>Adventure in the real world, <span className="gold">safely</span></>}>
          A game that sends people to real places has to get safety right. We built these rules in first.
        </SectionHead>
        <Stagger className="safety-list">
          {points.map(([i, t, d]) => (
            <motion.div key={t} variants={item} className="safety-item">
              <div className="safety-icon">
                <Icon name={i} size={30} />
              </div>
              <div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const faqs = [
  ['Is it free?', 'Yes. The Adventurer\'s Journey is free to play. You can buy cosmetics like outfits and title frames, but never combat power.'],
  ['What phones does it run on?', 'Android first. iPhone will follow after the first playtests.'],
  ['Do I have to go to a café to play?', 'You can create your adventurer and get ready anywhere. Duels, quests and the forge happen at taverns, because meeting people is the point.'],
  ['Do I have to buy something at the tavern?', 'No. Checking in, dueling and questing are free. Buying something is always up to you.'],
  ['Where can I play?', 'We start with a handful of Founding Taverns and grow city by city. Join the list and we\'ll tell you when a tavern opens near you.'],
  ['I own a café. What does it cost?', 'Nothing during the pilot. A QR stand at your counter and about 15 minutes of setup, which we do with you.'],
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container narrow">
        <SectionHead center eyebrow="Questions" title="Before you set out" />
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.05} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {q}
                <span className="faq-plus" />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="faq-a"
                  >
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Join() {
  const [role, setRole] = useState('player');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (SIGNUP_ENDPOINT) {
      try {
        await fetch(SIGNUP_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, role }),
        });
      } catch {
        // Still thank the visitor; nothing they can do about a network error.
      }
    }
    setDone(true);
  }

  return (
    <section className="join" id="join">
      <div className="join-glow" />
      <div className="container join-grid">
        <Reveal className="join-art" x={-40} y={0}>
          <img className="float-slow" src={art('hero-scholar')} alt="" />
          <img className="float-mid" src={art('hero-vampire')} alt="" />
        </Reveal>
        <Reveal className="join-card">
          <span className="eyebrow">Join the adventure</span>
          <h2>
            Your title is <span className="gold">waiting.</span>
          </h2>
          <p>Get an invite to the first playtests, or bring the first tavern to your town.</p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" className="join-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Icon name="trophy" size={56} />
                <b>You're on the list, adventurer.</b>
                <small>We'll write when the tavern doors open.</small>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }}>
                <div className="role-toggle" role="radiogroup">
                  {[
                    ['player', 'I want to play'],
                    ['owner', 'I own a café'],
                  ].map(([v, l]) => (
                    <button
                      type="button"
                      key={v}
                      role="radio"
                      aria-checked={role === v}
                      className={role === v ? 'on' : ''}
                      onClick={() => setRole(v)}
                    >
                      {role === v && <motion.span layoutId="role-pill" className="role-pill" />}
                      <span>{l}</span>
                    </button>
                  ))}
                </div>
                <div className="join-row">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                  />
                  <button className="btn btn-primary" type="submit">
                    {role === 'owner' ? 'Apply' : 'Get my invite'}
                  </button>
                </div>
                <small className="join-fine">No spam. One email when there's news.</small>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="brand">
          <img src={art('venue-tavern')} alt="" width={36} height={36} />
          <span>The Adventurer's Journey</span>
        </div>
        <nav>
          <a href="#how">How it works</a>
          <a href="#races">Races</a>
          <a href="#taverns">For cafés</a>
          <a href="#faq">FAQ</a>
        </nav>
        <small>© {new Date().getFullYear()} The Adventurer's Journey. All rights reserved.</small>
      </div>
    </footer>
  );
}
