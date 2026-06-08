import { useState, useEffect, useRef } from 'react';
import { FAQS } from '../data/faqs';
import AnimatedArcadeButton from '../components/AnimatedArcadeButton';

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  // Refs so the register-once handlers stay current
  const selectedIndexRef = useRef(0);
  useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);

  // Arcade navigation — registered once
  useEffect(() => {
    const onNav = (e) => {
      const len = FAQS.length;
      if (e.detail === 'LEFT')  setSelectedIndex((i) => (i === 0 ? len - 1 : i - 1));
      if (e.detail === 'RIGHT') setSelectedIndex((i) => (i === len - 1 ? 0 : i + 1));
    };

    const onBtn = (e) => {
      if (e.detail === 'A') {
        const faq = FAQS[selectedIndexRef.current];
        if (faq) setOpenId((prev) => (prev === faq.id ? null : faq.id));
      }
    };

    window.addEventListener('arcadeNavigation', onNav);
    window.addEventListener('arcadeButtonPress', onBtn);
    return () => {
      window.removeEventListener('arcadeNavigation', onNav);
      window.removeEventListener('arcadeButtonPress', onBtn);
    };
  }, []);

  return (
    <div className="faq-page">
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          {FAQS.map((faq, i) => (
            <li key={faq.id} className={`faq-item${i === selectedIndex ? ' selected' : ''}`}>
              <button
                className={`faq-question${openId === faq.id ? ' active' : ''}`}
                onClick={() => { setSelectedIndex(i); toggle(faq.id); }}
                aria-expanded={openId === faq.id}
              >
                <span className="faq-question__cursor" aria-hidden="true" />
                <span className="faq-question__text">{faq.question}</span>
                <span className={`faq-question__arrow${openId === faq.id ? ' down' : ''}`}>
                  &#9658;
                </span>
              </button>
              {openId === faq.id && (
                <span className="faq-answer">{faq.answer}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Arcade hint bar */}
      <div className="faq-page__hints">
        <div className="arcade-nav-hint">
          <span className="arcade-nav-btn arcade-nav-btn--left" aria-hidden="true">
            <span className="arcade-nav-btn__inner"><img src="/images/left.svg" alt="" /></span>
          </span>
          <span className="arcade-nav-btn arcade-nav-btn--right" aria-hidden="true">
            <span className="arcade-nav-btn__inner"><img src="/images/right.svg" alt="" /></span>
          </span>
          <span className="arcade-nav-label">Navigate</span>
        </div>
        <div className="arcade-action-hint">
          <AnimatedArcadeButton letter="A" />
          <span className="arcade-action-hint__label">Toggle answer</span>
        </div>
      </div>
    </div>
  );
}
