import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, removeFromCart, addToCart, getCartTotal, restaurant }) {
  const navigate = useNavigate();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax
  const deliveryFee = 30;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-sidebar">
      <h3>Your Cart</h3>
      
      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Add items to get started
          </p>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-header">
                <h4>{item.name}</h4>
                <span style={{ fontWeight: '700', color: '#6B3E3A' }}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <div className="cart-item-controls">
                <button
                  className="quantity-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <span style={{ fontWeight: '600', color: '#6B3E3A' }}>
                  {item.quantity}
                </span>
                <button
                  className="quantity-button"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <span style={{ color: '#8B6F47', fontSize: '0.9rem' }}>
                  ₹{item.price} each
                </span>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-total-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="cart-total-row">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="cart-total-row final">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;