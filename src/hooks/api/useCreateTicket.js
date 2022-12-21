import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useCreateTicket() {
  const token = useToken();

  const {
    loading: createTicketsLoading,
    error: createTicketsError,
    act: createTickets,
  } = useAsync((data) => ticketApi.createTicket(token, data));

  return {
    createTicketsLoading,
    createTicketsError,
    createTickets,
  };
}
