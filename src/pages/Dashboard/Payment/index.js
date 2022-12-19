import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BoxButton from '../../../components/Dashboard/common/boxButton';
//import useTicketType from '../../../hooks/api/useTicket';
import useTicket from '../../../hooks/api/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import usePaymentByUserId from '../../../hooks/api/usePaymentByUserId';
import PaymentResume from '../../../components/Dashboard/common/paymentResume';
import NoEnrollment from '../../../components/Dashboard/common/noEnrollment';
import PaymentBox from '../../../components/Dashboard/common/PaymentBox';

export default function Payment() {
  //const { ticketTypes } = useTicketType();

  const { ticket } = useTicket();
  const { enrollment } = useEnrollment();
  const { payment } = usePaymentByUserId();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <>
          <NoEnrollment>
            <StyledTypography variant="h6" color="textSecondary">
              Você precisa completar sua inscrição antes de prosseguir para a escolha do ingresso
            </StyledTypography>
          </NoEnrollment>
        </>
      ) : !ticket ? (
        <>
          <StyledTypography variant="h6" color="textSecondary">
            Primeiro, escolha sua modalidade de ingresso
          </StyledTypography>
          <BoxButton>
            <h1>Presencial</h1>
            <h2>R$ 250</h2>
          </BoxButton>
        </>
      ) : !payment ? (
        <h1>espera ai</h1>
      ) : payment.Ticket[0].Payment.length === 0 ? (
        <>
          <PaymentResume ticket={ticket} />
          {/* colocar a parte de pagamento aqui! */}
        </>
      ) : (
        <>
          <PaymentResume ticket={ticket} />
          <StyledTypography variant="h6" color="textSecondary">
            Pagamento
          </StyledTypography>
          <PaymentBox />
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
