import api from './api';

export async function getPaymentByTicketId(ticketId, token) {
  const response = await api.get(`/payments?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getPaymentByUserId(token) {
  const response = await api.get('/payments/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
