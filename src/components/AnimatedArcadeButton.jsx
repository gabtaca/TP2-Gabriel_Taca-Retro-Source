import { useState, useEffect } from 'react';

/**
 * Shows an arcade button image with a periodic press animation
 * to hint the user which physical button to press.
 * Animation: normal → pressed → normal (repeats every ~2.5s)
 */
export default function AnimatedArcadeButton({ letter, delay = 0 }) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    let t1, t2;
    const pulse = () => {
      setPressed(true);
      t2 = setTimeout(() => {
        setPressed(false);
        t1 = setTimeout(pulse, 800);
      }, 160);
    };
    t1 = setTimeout(pulse, 1000 + delay);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delay]);

  return (
    <div className="arcade-hint-btn">
      <img
        src={pressed ? '/images/btn_arc-pressed.png' : '/images/btn_arc.png'}
        alt={`Button ${letter}`}
        className={pressed ? 'pressed' : ''}
      />
      <span className="arcade-hint-btn__letter">{letter}</span>
    </div>
  );
}
