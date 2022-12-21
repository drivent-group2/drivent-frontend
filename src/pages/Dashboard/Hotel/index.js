import styled from 'styled-components';
import AlertMessage from '../../../components/Dashboard/common/AlertMessage';
import useTicket from '../../../hooks/api/useTicket';
export default function Hotel() {
  const { ticket, ticketLoading } = useTicket();

  if (ticketLoading || !ticket) {
    return <></>;
    //TODO: ALERTS
  }
  if (ticket.TicketType?.isRemote ) {
    return (
      <AlertMessage>
        Sua modalidade de ingresso não inclui hospedagem <br />
        Prossiga para a escolha de atividades
      </AlertMessage>
    );
  }
  return <></>;
}
