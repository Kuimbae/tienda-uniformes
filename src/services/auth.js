import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', {
    username,
    password
  });

  const token = response.data.token;
  localStorage.setItem('token', token);
  return response.data;
};
