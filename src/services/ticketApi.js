import api from './api';

export async function getTicketsTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createTicket(token, ticketTypeId) {
  const response = await api.post('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {},
    ticketTypeId,
  });
  return response.data;
}
