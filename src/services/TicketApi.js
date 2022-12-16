import api from './api';

export async function getTicketType(token) {
  const response = await api.post(
    '/tickets/types',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
