import styled from 'styled-components';
import AlertMessage from '../../../components/Dashboard/common/AlertMessage';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket, getTicket, ticketLoading } = useTicket();

  if (ticketLoading) {
    return 'Carregando....';
  }
  if(!ticket) {
    return (
      <ErrorMessage>Você precisa montar seu ticket antes de fazer a escolha da hospedagem</ErrorMessage>
    );
  }
  if (ticket.status === 'RESERVED') {
    return (
      <ErrorMessage>Você precisa ter confirmado pagamento antes de fazer a escolha da hospedagem</ErrorMessage>
    );
  }
  if (ticket.TicketType?.isRemote ) {
    return (
      <AlertMessage>
        Sua modalidade de ingresso não inclui hospedagem <br />
        Prossiga para a escolha de atividades
      </AlertMessage>
    );
  }
  return 'Hotel: Em breve!';
}

const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;
