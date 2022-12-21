import ResumeBox from './TicketResume';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export default function PaymentResume({ ticket }) {
  return (
    <>
      <StyledTypography variant="h6" color="textSecondary">
        Ingresso escolhido
      </StyledTypography>
      {ticket.TicketType.isRemote ? (
        <ResumeBox>
          <h1>Online</h1>
          <h2>R$ {ticket.TicketType.price}</h2>
        </ResumeBox>
      ) : ticket.TicketType.includesHotel ? (
        <ResumeBox>
          <h1>Presencial + Com Hotel</h1>
          <h2>R$ {ticket.TicketType.price}</h2>
        </ResumeBox>
      ) : (
        <ResumeBox>
          <h1>Presencial + Sem Hotel</h1>
          <h2>R$ {ticket.TicketType.price}</h2>
        </ResumeBox>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
