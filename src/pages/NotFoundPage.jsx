import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCrt } from '../context/CrtContext';

export default function NotFoundPage() {
  const { setCrtVariant } = useCrt();

  useEffect(() => {
    setCrtVariant('snow');
    return () => setCrtVariant(null);
  }, [setCrtVariant]);

  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <p className="error-page__msg">Signal lost. Page not found.</p>
      <Link to="/" className="error-page__link">← Back to Home</Link>
    </div>
  );
}
