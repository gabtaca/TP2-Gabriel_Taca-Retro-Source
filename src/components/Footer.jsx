import { Link } from 'react-router-dom';
import { FOOTER_MENU } from '../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <nav className="footer__menu" aria-label="Footer navigation">
        {FOOTER_MENU.map((item) => (
          <Link key={item.id} to={item.url}>
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="footer__credit">
        <p>This website has been created for <span className="footer__fun">fun</span> by <a className="footer__credit-link" href="https://gabrieltaca.com" target="_blank" rel="noopener noreferrer">Gabriel Taca</a>.</p>
        <p>&copy; 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
