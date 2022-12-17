import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketLoading,
    error: ticketError,
  } = useAsync(() => ticketApi.getTicketsTypes(token));

  return {
    tickets,
    ticketLoading,
    ticketError,
  };
}
