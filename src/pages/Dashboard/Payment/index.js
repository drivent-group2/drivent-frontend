import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BoxButton from '../../../components/Dashboard/common/boxButton';
import useTicketType from '../../../hooks/api/useTicket';

export default function Payment() {
  const { ticketTypes } = useTicketType();
  console.log(ticketTypes);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" color="textSecondary">
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>
      <BoxButton>
        <h1>Presencial</h1>
        <h2>R$ 250</h2>
      </BoxButton>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
