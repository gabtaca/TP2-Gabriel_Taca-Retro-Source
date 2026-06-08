import { useState } from 'react';
import { FAQS } from '../data/faqs';

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="faq-page">
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          {FAQS.map((faq) => (
            <li key={faq.id} className="faq-item">
              <button
                className={`faq-question${openId === faq.id ? ' active' : ''}`}
                onClick={() => toggle(faq.id)}
                aria-expanded={openId === faq.id}
              >
                {faq.question}
                <span
                  className={`faq-question__arrow${openId === faq.id ? ' down' : ''}`}
                >
                  ▶
                </span>
              </button>
              {openId === faq.id && (
                <span className="faq-answer">{faq.answer}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
