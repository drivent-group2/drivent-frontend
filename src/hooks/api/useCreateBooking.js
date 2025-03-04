import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useCreateBooking() {
  const token = useToken();

  const {
    loading: createBookingLoading,
    error: createBookingError,
    act: createBooking,
  } = useAsync((data) => bookingApi.createBooking(token, data));

  return {
    createBookingLoading,
    createBookingError,
    createBooking,
  };
}
