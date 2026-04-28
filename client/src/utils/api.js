import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data, token) => api.post('/products', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateProduct = (id, data, token) => api.put(`/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteProduct = (id, token) => api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const adminLogin = (credentials) => axios.post(`${API_BASE_URL.replace('/api', '')}/admin/login`, credentials);