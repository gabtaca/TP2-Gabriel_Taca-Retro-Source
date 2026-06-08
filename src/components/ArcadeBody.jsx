import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrt } from '../context/CrtContext';

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
  const [power, setPower] = useState(true);
  const navigate = useNavigate();
  const { startBoot } = useCrt();

  const dispatch = (name, detail) =>
    window.dispatchEvent(new CustomEvent(name, { detail }));

  const handlePower = () => {
    if (power) {
      setPower(false);
      navigate('/power-off');
    } else {
      startBoot(() => {
        setPower(true);
        navigate('/');
      });
    }
  };

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

        {/* Power button row */}
        <div className="arcade-body__power-row">
          <button
            className={`arcade-body__power-btn${power ? ' on' : ''}`}
            onClick={handlePower}
            aria-pressed={power}
            aria-label={power ? 'Power off' : 'Power on'}
          >
            POWER
          </button>
          <span className={`arcade-body__power-led${power ? ' on' : ''}`} aria-hidden="true" />
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
