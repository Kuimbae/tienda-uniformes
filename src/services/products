import api from './api';

export const fetchProducts = async () => {
  const response = await api.get('/products?limit=12');
  return response.data.products;
};
