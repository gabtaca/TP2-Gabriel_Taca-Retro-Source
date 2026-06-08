import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartAside() {
  const { cartItems, totalQuantity, isOpen, closeCart, removeFromCart, clearCart } =
    useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-aside__overlay${isOpen ? ' open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Aside panel */}
      <aside className={`cart-aside${isOpen ? ' open' : ''}`} aria-label="Shopping cart">
        <div className="cart-aside__header">
          <h2>CART</h2>
          <button className="cart-aside__close" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cart-aside__body">
          {cartItems.length === 0 ? (
            <p className="cart-aside__empty">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-line">
                <div className="cart-line__info">
                  <span className="cart-line__title">{item.title}</span>
                  <span className="cart-line__price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <span className="cart-line__qty">Qty: {item.quantity}</span>
                </div>
                <button
                  className="cart-line__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-aside__footer">
            <div className="cart-aside__total">
              <span>Total ({totalQuantity} items)</span>
              <span>{formatPrice(total)}</span>
            </div>
            <a href="/checkout" className="cart-aside__checkout">
              Checkout
            </a>
            <button className="cart-aside__clear" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
