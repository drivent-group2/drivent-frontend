import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/HotelApi';

export default function useHotels() {
  const token = useToken();
  const { data: hotels, loading: hotelLoading, error: hotelError } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelLoading,
    hotelError,
  };
}
