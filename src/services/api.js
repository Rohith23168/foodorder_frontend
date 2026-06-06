import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const restaurantService = {
  getAllRestaurants: () => api.get('/restaurants'),
  getRestaurantById: (id) => api.get(`/restaurants/${id}`),
  searchRestaurants: (query) => api.get(`/restaurants/search?query=${query}`),
};

export const menuItemService = {
  getMenuItemsByRestaurant: (restaurantId) => api.get(`/menu-items/restaurant/${restaurantId}`),
};

export const orderService = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderById: (id) => api.get(`/orders/${id}`),
};

export default api;