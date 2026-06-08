import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="error-page">
      <div className="error-page__crt">
        <div className="error-page__text">
          <h1>404</h1>
          <p>Signal lost. Page not found.</p>
          <Link to="/" className="error-page__link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
