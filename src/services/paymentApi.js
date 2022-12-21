import api from './api';

let cardInfo;

export function setCardInfo(paymentInfo) {
  cardInfo = paymentInfo;
}

export function getCardInfo() {
  return cardInfo;
}

export async function savePayment(body, token) {
  const response = await api.post('payments/process', body, {
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

export async function getPaymentByTicketId(ticketId, token) {
  const response = await api.get(`/payments?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
