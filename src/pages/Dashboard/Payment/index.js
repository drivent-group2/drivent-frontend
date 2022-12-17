import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BoxButton from '../../../components/Dashboard/common/boxButton';
//import useTicketType from '../../../hooks/api/useTicket';
import useTicket from '../../../hooks/api/useTicket2';
import styledComponents from 'styled-components';
import ResumeBox from '../../../components/Dashboard/common/ticketResume';

export default function Payment() {
  //const { ticketTypes } = useTicketType();

  const { ticket } = useTicket();
  console.log(ticket);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!ticket ? (
        <>
          <StyledTypography variant="h6" color="textSecondary">
            Primeiro, escolha sua modalidade de ingresso
          </StyledTypography>
          <BoxButton>
            <h1>Presencial</h1>
            <h2>R$ 250</h2>
          </BoxButton>
        </>
      ) : (
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
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
