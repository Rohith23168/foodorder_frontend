import React from 'react';

function RestaurantCard({ restaurant, onClick }) {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="restaurant-image"
      />
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p style={{ color: '#8B6F47', marginBottom: '0.5rem' }}>
          {restaurant.cuisine}
        </p>
        <p style={{ color: '#8B6F47', fontSize: '0.9rem' }}>
          {restaurant.address}
        </p>
        <div className="restaurant-meta">
          <span className="rating">⭐ {restaurant.rating}</span>
          <span>🕐 {restaurant.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;