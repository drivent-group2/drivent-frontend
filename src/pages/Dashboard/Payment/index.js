import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BoxButton from '../../../components/Dashboard/common/boxButton';
import useTicketType from '../../../hooks/api/useTicket';
import { useState } from 'react';

export default function Payment() {
  const ticketTypes = useTicketType();
  const [isRemote, setIsRemote] = useState(null);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" color="textSecondary">
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>
      {!ticketTypes.ticketLoading && (
        <RemoteButtons tickets={ticketTypes.tickets} isRemote={isRemote} setIsRemote={setIsRemote} />
      )}
    </>
  );
}
function RemoteButtons({ tickets, isRemote, setIsRemote }) {
  return (
    <ButtonsWrappler>
      {tickets.map((ticket, index) => {
        if (!ticket.includesHotel) {
          return (<BoxButton key={index} selected={isRemote === ticket.isRemote} onClick={() => setIsRemote(ticket.isRemote)}>
            {ticket.isRemote ? <h1>Online</h1> : <h1>Presencial</h1>}
            <h2>R$ {ticket.price / 100}</h2>
          </BoxButton>);
        }
      })}
    </ButtonsWrappler>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const ButtonsWrappler = styled.div`
  display: felx;
`;
