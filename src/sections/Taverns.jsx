import { motion } from 'framer-motion';
import { art, Icon, item, Reveal, SectionHead, Stagger, TiltCard } from '../components/ui.jsx';

const perks = [
  { icon: 'door', title: 'New faces through the door', text: 'Duels and quests only work in person, so players come to you, often in groups.' },
  { icon: 'hourglass', title: 'Fill your quiet hours', text: 'Post quests that pull adventurers in exactly when your tables are empty.' },
  { icon: 'chart', title: 'See what works', text: 'Your Innkeeper dashboard shows weekly visits and your busiest times.' },
  { icon: 'medalGold', title: 'Founding Tavern badge', text: 'Early partners keep a permanent badge on the map. Only pilot cafés can ever earn it.' },
  { icon: 'key', title: 'Ready in 15 minutes', text: 'A QR stand at the counter and a short setup we do together. Free during the pilot.' },
];

export default function Taverns() {
  return (
    <section className="section taverns" id="taverns">
      <div className="container">
        <div className="taverns-top">
          <SectionHead eyebrow="For café owners" title={<>Turn your café into <span className="gold">a legendary tavern</span></>}>
            We bring you customers who stay, come back and bring friends. You become the Innkeeper, with your own
            title and a place on the map.
          </SectionHead>
          <Reveal className="innkeeper" x={40} y={0}>
            <TiltCard className="innkeeper-card">
              <div className="ik-head">
                <img src={art('venue-tavern')} alt="" width={54} height={54} />
                <div>
                  <b>The Drowsy Dragon</b>
                  <small>
                    <Icon name="check" size={14} /> Verified tavern · Founding Tavern
                  </small>
                </div>
              </div>
              <img className="ik-art" src={art('hero-innkeeper')} alt="A dwarf innkeeper in an apron" />
              <div className="ik-stats">
                <div>
                  <b>+42</b>
                  <small>visits this week</small>
                </div>
                <div>
                  <b>4–6 pm</b>
                  <small>busiest time</small>
                </div>
              </div>
              <span className="ik-note">Example dashboard</span>
            </TiltCard>
          </Reveal>
        </div>

        <Stagger className="perk-grid">
          {perks.map((p) => (
            <motion.div key={p.title} variants={item} className="perk">
              <Icon name={p.icon} size={40} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </motion.div>
          ))}
        </Stagger>

        <Reveal className="taverns-cta">
          <a className="btn btn-primary" href="#join" data-role="owner">
            Apply as a Founding Tavern
          </a>
          <span>Free pilot · no contract · leave any time</span>
        </Reveal>
      </div>
    </section>
  );
}
