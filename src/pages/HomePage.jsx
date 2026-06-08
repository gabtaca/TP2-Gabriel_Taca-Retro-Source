import Carousel from '../components/Carousel';
import { newsList } from '../data/newsData';
import AnimatedArcadeButton from '../components/AnimatedArcadeButton';

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__news-header">
        <h1>
          <strong>RETRO</strong>
          <span> News</span>
        </h1>
        <p>News from the video game industry</p>
      </div>

      <div className="home__arcade-labels">
        <div className="arcade-nav-hint">
          <span className="arcade-nav-btn arcade-nav-btn--left" aria-hidden="true">
            <span className="arcade-nav-btn__inner">
              <img src="/images/left.svg" alt="" />
            </span>
          </span>
          <span className="arcade-nav-btn arcade-nav-btn--right" aria-hidden="true">
            <span className="arcade-nav-btn__inner">
              <img src="/images/right.svg" alt="" />
            </span>
          </span>
          <span className="arcade-nav-label">Navigate</span>
        </div>
        <div className="arcade-action-hint">
          <AnimatedArcadeButton letter="A" />
          <span className="arcade-action-hint__label">Open article</span>
        </div>
      </div>

      <Carousel items={newsList} />
    </div>
  );
}
