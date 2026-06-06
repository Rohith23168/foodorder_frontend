import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItemService, restaurantService } from '../services/api';
import Cart from './Cart';

function RestaurantMenu({ cart, addToCart, removeFromCart, selectedRestaurant }) {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(selectedRestaurant);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    try {
      if (!restaurant) {
        const restaurantResponse = await restaurantService.getRestaurantById(id);
        setRestaurant(restaurantResponse.data);
      }
      
      const menuResponse = await menuItemService.getMenuItemsByRestaurant(id);
      setMenuItems(menuResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
          <h3>Loading menu...</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1 onClick={() => navigate('/')}>Food Order 🍽️</h1>
          <button className="cart-button">
            🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      </nav>

      <div className="menu-container">
        {restaurant && (
          <div className="menu-header">
            <h2>{restaurant.name}</h2>
            <p style={{ color: '#8B6F47', fontSize: '1.1rem' }}>
              {restaurant.cuisine} • {restaurant.deliveryTime}
            </p>
            <p style={{ color: '#8B6F47', marginTop: '0.5rem' }}>
              📍 {restaurant.address}
            </p>
          </div>
        )}

        <div className="menu-layout">
          <div className="menu-items">
            {menuItems.length === 0 ? (
              <div className="empty-state">
                <h3>No menu items available</h3>
              </div>
            ) : (
              menuItems.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-info">
                    <span className={`veg-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
                      {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="menu-item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="menu-item-image"
                  />
                  <button
                    className="add-button"
                    onClick={() => addToCart(item)}
                  >
                    Add +
                  </button>
                </div>
              ))
            )}
          </div>

          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            getCartTotal={getCartTotal}
            restaurant={restaurant}
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;