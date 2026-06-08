import { useState } from 'react';

function playSound(file) {
  try {
    const audio = new Audio(file);
    audio.play().catch(() => {});
  } catch {
    // sound file not found, skip silently
  }
}

export default function ArcadeBody() {
  const [pressedA, setPressedA] = useState(false);
  const [pressedB, setPressedB] = useState(false);

  const dispatch = (name, detail) =>
    window.dispatchEvent(new CustomEvent(name, { detail }));

  return (
    <div className="arcade-body">
      <div className="arcade-body__top-gradient" />

      <div className="arcade-body__main">
        <div className="arcade-body__controls">
          {/* D-pad nav */}
          <nav className="arcade-body__nav" aria-label="Game navigation">
            <button
              id="btn_left"
              className="arcade-body__nav-btn"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                playSound('/sounds/click-sound.wav');
                dispatch('arcadeNavigation', 'LEFT');
              }}
            >
              <span>
                <img src="/images/left.svg" alt="" />
              </span>
            </button>

            <button
              id="btn_right"
              className="arcade-body__nav-btn"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                playSound('/sounds/click-sound.wav');
                dispatch('arcadeNavigation', 'RIGHT');
              }}
            >
              <span>
                <img src="/images/right.svg" alt="" />
              </span>
            </button>
          </nav>

          {/* A / B buttons */}
          <nav className="arcade-body__buttons" aria-label="Action buttons">
            <button
              id="buttonA"
              className="arcade-body__action-btn"
              aria-label="Button A"
              onMouseDown={() => setPressedA(true)}
              onMouseUp={() => setPressedA(false)}
              onMouseLeave={() => setPressedA(false)}
              onTouchStart={() => setPressedA(true)}
              onTouchEnd={() => setPressedA(false)}
              onClick={(e) => {
                e.stopPropagation();
                playSound('/sounds/key-punch.mp3');
                dispatch('arcadeButtonPress', 'A');
              }}
            >
              <img
                src={pressedA ? '/images/btn_arc-pressed.png' : '/images/btn_arc.png'}
                alt="Button A"
              />
              A
            </button>

            <button
              id="buttonB"
              className="arcade-body__action-btn"
              aria-label="Button B"
              onMouseDown={() => setPressedB(true)}
              onMouseUp={() => setPressedB(false)}
              onMouseLeave={() => setPressedB(false)}
              onTouchStart={() => setPressedB(true)}
              onTouchEnd={() => setPressedB(false)}
              onClick={(e) => {
                e.stopPropagation();
                playSound('/sounds/key-punch.mp3');
                dispatch('arcadeButtonPress', 'B');
              }}
            >
              <img
                src={pressedB ? '/images/btn_arc-pressed.png' : '/images/btn_arc.png'}
                alt="Button B"
              />
              B
            </button>
          </nav>
        </div>

        {/* Banner */}
        <div className="arcade-body__banner">
          <img src="/images/retrosource_banner_main.png" alt="Retro Source" />
        </div>

        <div className="arcade-body__spacer" />
        <div className="arcade-body__bottom-gradient" />
      </div>
    </div>
  );
}
