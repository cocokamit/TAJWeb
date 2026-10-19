import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { SectionHead, Icon } from '../components/ui.jsx';
import { CharacterScreen, DuelScreen, MapScreen } from '../components/PhoneScreens.jsx';

const steps = [
  {
    icon: 'adventurer',
    title: 'Create your adventurer',
    text: 'Pick from nine races, style your look, and discover the innate title you were born with. Nobody else plays quite like you.',
    screen: <CharacterScreen />,
  },
  {
    icon: 'map',
    title: 'Find a tavern nearby',
    text: 'Real cafés on the map glow as taverns. Walk in, check in with the counter QR code, and the tavern opens up: quest board, shop and forge.',
    screen: <MapScreen />,
  },
  {
    icon: 'duel',
    title: 'Duel, quest and rise',
    text: 'Turn-based duels happen only where adventurers actually gather. Win, climb the monthly Tavern Champions board and level up from Novice to Mythic.',
    screen: <DuelScreen />,
  },
];

// Tall section: the phone sticks in place while the steps scroll past and
// swap its screen.
export default function HowItWorks() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  return (
    <section className="section how" id="how">
      <div className="container">
        <SectionHead eyebrow="How it works" title={<>A fantasy world, <span className="gold">drawn on your streets</span></>}>
          Everyday places become part of the adventure. Here is how a journey begins.
        </SectionHead>

        <div className="how-grid" ref={ref}>
          <div className="how-steps">
            {steps.map((s, i) => (
              <div key={s.title} className={`how-step ${active === i ? 'on' : ''}`}>
                <div className="how-num">
                  <Icon name={s.icon} size={34} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="how-phone-inline">
                  <div className="phone small">{s.screen}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="how-sticky">
            <div className="phone">
              <div className="phone-notch" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="phone-screen"
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {steps[active].screen}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="how-dots">
              {steps.map((s, i) => (
                <i key={s.title} className={active === i ? 'on' : ''} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
