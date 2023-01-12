import api from './api';

export async function getActivities(token, ticketTypeId) {
  const response = await api.get(`/activities/?ticketTypeId=${ticketTypeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postTicketActivity(token, ticketId, activityId, ticketTypeId) {
  const response = await api.post(
    `/activities/enter/?ticketTypeId=${ticketTypeId}`,
    { ticketId, activityId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
