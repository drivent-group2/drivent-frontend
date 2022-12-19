import useToken from '../../../hooks/useToken';
import useTicket from '../../../hooks/api/useTicket';
import PaymentPage from './PaymentPage';
import TicketPage from './TicketPage';

export default function Payment() {
  const token = useToken();
  const { ticket, getTicket, ticketLoading } = useTicket();

  return (
    <>
      {ticket ? (
        <PaymentPage />
      ) : (
        <TicketPage/>
      )}
    </>
  );
}
