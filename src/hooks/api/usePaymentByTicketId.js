import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentApi from '../../services/paymentApi';

export default function usePaymentByTicketId(ticketId) {
  const token = useToken();
  console.log(ticketId);
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
  } = useAsync(() => paymentApi.getPaymentByTicketId(ticketId, token), true);

  return {
    payment,
    paymentLoading,
    paymentError,
  };
}
