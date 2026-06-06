import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantService } from '../services/api';
import RestaurantCard from './RestaurantCard';

function Home({ setSelectedRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantService.getAllRestaurants();
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      fetchRestaurants();
    } else {
      try {
        const response = await restaurantService.searchRestaurants(query);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error searching restaurants:', error);
      }
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1 onClick={() => navigate('/')}>Food Order 🍽️</h1>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for restaurants or cuisines..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </nav>

      <div className="home-container">
        <div className="home-header">
          <h2>Order food from your favorite restaurants</h2>
          <p>Delicious meals delivered to your doorstep</p>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Loading restaurants...</h3>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="empty-state">
            <h3>No restaurants found</h3>
            <p>Try a different search term</p>
          </div>
        ) : (
          <div className="restaurants-grid">
            {restaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;