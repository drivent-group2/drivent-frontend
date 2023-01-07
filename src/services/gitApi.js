import api from './api';

export async function gitAuth(email) {
  const response = await api.post('/auth/oauth', { email });
  return response.data;
}
