import api from './api';

export async function getActivities(token, ticketTypeId) {
  const response = await api.get(`/activities/?ticketTypeId=${ticketTypeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
