import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket, getTicket, ticketLoading } = useTicket();

  if (ticketLoading) {
    return 'Carregando....';
  }
  if (ticket.status === 'RESERVED') {
    return (
      <PaymentMessage>Você precisa ter confirmado pagamento antes de fazer a escolha da hospedagem</PaymentMessage>
    );
  }
  return 'Hotel: Em breve!';
}

const PaymentMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;
