import { useState, useEffect, useRef } from 'react';

export default function Carousel({ items }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const itemRef = useRef(null);

  // Keep itemRef current so the button handler never has a stale link
  useEffect(() => {
    itemRef.current = items[current];
  }, [current, items]);

  const next = () => setCurrent((i) => (i === items.length - 1 ? 0 : i + 1));
  const prev = () => setCurrent((i) => (i === 0 ? items.length - 1 : i - 1));

  // Auto-advance every 6 s (reset on manual change)
  useEffect(() => {
    timeoutRef.current = setTimeout(next, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Arcade arrows: ◄ = prev,  ► = next
  useEffect(() => {
    const onNav = (e) => {
      if (e.detail === 'LEFT') setCurrent((i) => (i === 0 ? items.length - 1 : i - 1));
      if (e.detail === 'RIGHT') setCurrent((i) => (i === items.length - 1 ? 0 : i + 1));
    };
    window.addEventListener('arcadeNavigation', onNav);
    return () => window.removeEventListener('arcadeNavigation', onNav);
  }, [items.length]);

  // Arcade A button: open current article in new tab
  useEffect(() => {
    const onBtn = (e) => {
      if (e.detail === 'A' && itemRef.current?.link) {
        window.open(itemRef.current.link, '_blank', 'noopener,noreferrer');
      }
    };
    window.addEventListener('arcadeButtonPress', onBtn);
    return () => window.removeEventListener('arcadeButtonPress', onBtn);
  }, []);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    touchStartX.current = null;
  };

  if (!items || items.length === 0) return null;

  const item = items[current];

  return (
    <div className="carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* Full-width image with slide counter badge */}
      <div className="carousel__image-wrap">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="carousel__image"
          loading="lazy"
          onError={(e) => { e.target.src = '/images/logo_arcade.png'; }}
        />
        <span className="carousel__badge">{current + 1} / {items.length}</span>
      </div>

      {/* Article text */}
      <div className="carousel__content">
        <h3 className="carousel__news-title">{item.title}</h3>
        <p className="carousel__meta">{item.source} · {item.date}</p>
        {item.description && (
          <p className="carousel__description">{item.description}</p>
        )}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="carousel__read-more"
        >
          Read More →
        </a>
      </div>

      {/* Footer: centered dot indicators */}
      <div className="carousel__footer">
        <div className="carousel__indicators">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
