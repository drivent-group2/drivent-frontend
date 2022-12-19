import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/TicketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: event,
    loading: eventLoading,
    error: eventError,
  } = useAsync(() => ticketApi.getTicketType(token), true);

  return {
    event,
    eventLoading,
    eventError,
  };
}
