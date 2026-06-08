export function StarParticles() {
  const count = 7;
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src="/images/star.png"
          alt=""
          className="particle"
          style={{
            width: `${Math.random() * 10 + 10}px`,
            height: `${Math.random() * 10 + 10}px`,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CoinParticles() {
  const count = 7;
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src="/images/coin.png"
          alt=""
          className="particle"
          style={{
            width: `${Math.random() * 10 + 10}px`,
            height: `${Math.random() * 10 + 10}px`,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
