import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentApi from '../../services/paymentApi';

export default function usePaymentByUserId() {
  const token = useToken();
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
  } = useAsync(() => paymentApi.getPaymentByUserId(token), true);

  return {
    payment,
    paymentLoading,
    paymentError,
  };
}
