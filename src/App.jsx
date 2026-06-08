import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import PageLayout from './components/PageLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <PageLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Simple placeholder pages for footer links */}
              <Route path="/partners" element={<PlaceholderPage title="Our Partners" />} />
              <Route path="/policies" element={<PlaceholderPage title="Policies" />} />
              <Route path="/policies/*" element={<PlaceholderPage title="Policies" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageLayout>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="faq-page">
      <div className="faq-section">
        <h2>{title}</h2>
        <p style={{ color: '#2e4f29', fontFamily: 'Silkscreen, monospace', fontSize: '0.875rem' }}>
          Coming soon. Check back later!
        </p>
      </div>
    </div>
  );
}

export default App;
