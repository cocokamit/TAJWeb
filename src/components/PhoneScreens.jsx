import { art, Icon } from './ui.jsx';

// Simplified recreations of the app's screens, used inside the phone mockup.

export function MapScreen() {
  const pins = [
    { x: 22, y: 30, type: 'tavern', name: 'The Drowsy Dragon' },
    { x: 66, y: 22, type: 'mageTower', name: 'Mage Tower' },
    { x: 58, y: 58, type: 'tavern', name: 'Moonbrew' },
    { x: 28, y: 70, type: 'wilds', name: 'The Wilds' },
  ];
  return (
    <div className="scr scr-map">
      <svg className="map-roads" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M-5 40 Q30 35 50 45 T105 38" />
        <path d="M40 -5 Q45 40 38 60 T45 105" />
        <path d="M-5 80 Q40 70 70 85 T105 75" className="thin" />
        <path d="M70 -5 Q65 30 80 55 T75 105" className="thin" />
        <circle cx="80" cy="80" r="12" className="water" />
      </svg>
      {pins.map((p) => (
        <div key={p.name} className="map-pin" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <img src={art(`venue-${p.type}`)} alt="" />
          <span>{p.name}</span>
        </div>
      ))}
      <div className="map-me" style={{ left: '44%', top: '46%' }}>
        <img src={art('portrait-elf')} alt="" />
      </div>
      <div className="scr-sheet">
        <b>The Drowsy Dragon</b>
        <small>Verified tavern · 120 m away</small>
        <div className="scr-btn">Check in</div>
      </div>
    </div>
  );
}

export function CharacterScreen() {
  return (
    <div className="scr scr-char">
      <div className="scr-title">Your adventurer</div>
      <div className="char-stage">
        <img src={art('hero-fae')} alt="" />
      </div>
      <div className="char-name">Lumi</div>
      <div className="title-chip">
        <Icon name="sparkle" size={16} /> The Flower · <em>Rare</em>
      </div>
      <div className="scr-stats">
        <span><Icon name="heart" size={16} /> 120</span>
        <span><Icon name="mana" size={16} /> 80</span>
        <span><Icon name="star" size={16} /> Lv 7</span>
      </div>
    </div>
  );
}

export function DuelScreen() {
  return (
    <div className="scr scr-duel">
      <div className="duel-bar enemy">
        <span>Grukk</span>
        <i style={{ '--hp': '38%' }} />
      </div>
      <div className="duel-field">
        <img className="duel-foe" src={art('hero-orc')} alt="" />
        <img className="duel-me" src={art('hero-human')} alt="" />
        <div className="duel-fx"><Icon name="fire" size={46} /></div>
      </div>
      <div className="duel-bar me">
        <span>You</span>
        <i style={{ '--hp': '72%' }} />
      </div>
      <div className="duel-skills">
        <div><Icon name="fire" size={18} /> Fireball</div>
        <div><Icon name="shield" size={18} /> Guard</div>
        <div><Icon name="heal" size={18} /> Mend</div>
        <div><Icon name="potion" size={18} /> Item</div>
      </div>
    </div>
  );
}
