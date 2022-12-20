import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useCreateTicket() {
  const token = useToken();

  const {
    act: createTickets,
    loading: createTicketsLoading,
    error: createTicketsError,
  } = useAsync((data) => ticketApi.createTicket(token, data));

  return {
    createTickets,
    createTicketsLoading,
    createTicketsError,
  };
}
