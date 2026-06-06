import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';

function Checkout({ cart, selectedRestaurant, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    paymentMethod: 'Cash on Delivery'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRestaurant) {
      alert('No restaurant selected');
      navigate('/');
      return;
    }

    const orderData = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      deliveryAddress: formData.deliveryAddress,
      subtotal: subtotal,
      tax: tax,
      total: total,
      paymentMethod: formData.paymentMethod,
      restaurant: selectedRestaurant,
      orderItems: cart.map(item => ({
        menuItem: item,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await orderService.createOrder(orderData);
      clearCart();
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-content">
            <h1 onClick={() => navigate('/')}>Food Order 🍽️</h1>
          </div>
        </nav>
        <div className="checkout-container">
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Add items before checking out</p>
            <button className="home-button" onClick={() => navigate('/')}>
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1 onClick={() => navigate('/')}>Food Order 🍽️</h1>
        </div>
      </nav>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Checkout</h2>

          <div className="form-section">
            <h3>Delivery Details</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="form-group">
              <label>Delivery Address *</label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                required
                placeholder="Enter complete delivery address"
                rows="3"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Order Summary</h3>
            <div className="order-summary">
              <h4>Items from {selectedRestaurant?.name}</h4>
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="summary-item" style={{ marginTop: '1rem' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-item total">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="form-group">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
          </div>

          <button type="submit" className="confirm-button">
            Confirm Order - ₹{total.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;