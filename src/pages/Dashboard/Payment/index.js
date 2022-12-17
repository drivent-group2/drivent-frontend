import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BoxButton from '../../../components/Dashboard/common/boxButton';
import useTicketType from '../../../hooks/api/useTicket';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Payment() {
  const ticketTypes = useTicketType();
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    if (ticketTypes.tickets) setTickets(ticketTypes.tickets);
  }, [ticketTypes.tickets]);
  console.log(tickets);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" color="textSecondary">
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>
      <Buttons tickets={tickets}></Buttons>
    </>
  );
}
function Buttons({ tickets }) {
  return (
    <>
      {tickets.map((ticket) => {
        <BoxButton>
          {ticket.isRemote ? <h1>Remoto</h1> : <h1>Presencial</h1>}
          <h2>{ticket.price}</h2>
        </BoxButton>;
      })}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
