import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useSavePayment() {
  const token = useToken();
  
  const {
    loading: paymentLoading,
    error: paymentError,
    act: savePayment
  } = useAsync((data) => paymentApi.savePayment(data, token), false);

  return {
    paymentLoading,
    paymentError,
    savePayment
  };
}
