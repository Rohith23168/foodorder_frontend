import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';

function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderService.getOrderById(orderId);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-content">
            <h1 onClick={() => navigate('/')}>Food Order 🍽️</h1>
          </div>
        </nav>
        <div className="empty-state">
          <h3>Loading order details...</h3>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-content">
            <h1 onClick={() => navigate('/')}>Food Order 🍽️</h1>
          </div>
        </nav>
        <div className="confirmation-container">
          <div className="empty-state">
            <h3>Order not found</h3>
            <button className="home-button" onClick={() => navigate('/')}>
              Go to Home
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

      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p style={{ color: '#8B6F47', fontSize: '1.1rem', marginBottom: '1rem' }}>
            Thank you for your order, {order.customerName}!
          </p>

          <div className="order-details">
            <div className="detail-row">
              <span><strong>Order ID:</strong></span>
              <span>#{order.id}</span>
            </div>
            <div className="detail-row">
              <span><strong>Restaurant:</strong></span>
              <span>{order.restaurant.name}</span>
            </div>
            <div className="detail-row">
              <span><strong>Delivery Address:</strong></span>
              <span>{order.deliveryAddress}</span>
            </div>
            <div className="detail-row">
              <span><strong>Phone:</strong></span>
              <span>{order.customerPhone}</span>
            </div>
            <div className="detail-row">
              <span><strong>Payment Method:</strong></span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="detail-row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #D4A574' }}>
              <span><strong>Total Amount:</strong></span>
              <span style={{ fontSize: '1.2rem', color: '#6B3E3A' }}>
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="delivery-time">
            🚴 Arriving in {order.estimatedDeliveryTime} minutes
          </div>

          <p style={{ color: '#8B6F47', marginBottom: '1.5rem' }}>
            Your delicious food is being prepared and will reach you soon!
          </p>

          <button className="home-button" onClick={() => navigate('/')}>
            Order More Food
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;