import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: hotelsTicket,
  } = useAsync(() => hotelApi.getHotel(token));

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    hotelsTicket,
  };
}
