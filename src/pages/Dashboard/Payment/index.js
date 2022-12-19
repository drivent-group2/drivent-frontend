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

import useTicketType from '../../../hooks/api/useTicketType';
import { useState, useEffect } from 'react';

export default function Payment() {
  const { ticket } = useTicket();
  const { enrollment } = useEnrollment();
  const { payment } = usePaymentByUserId();
  const ticketTypes = useTicketType();
  const [isRemote, setIsRemote] = useState(null);
  const [includesHotel, setIncludesHotel] = useState(null);

  useEffect(() => {
    if (isRemote) setIncludesHotel(null);
  }, [isRemote]);

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
          {!ticketTypes.ticketLoading && (
            <RemoteButtons tickets={ticketTypes.tickets} isRemote={isRemote} setIsRemote={setIsRemote} />
          )}
          {isRemote === false && (
            <>
              <StyledTypography variant="h6" color="textSecondary">
                Ótimo! Agora escolha sua modalidade de hospedagem
              </StyledTypography>
              <HotelButtons
                tickets={ticketTypes.tickets}
                includesHotel={includesHotel}
                setIncludesHotel={setIncludesHotel}
              />
            </>
          )}
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
function HotelButtons({ tickets, includesHotel, setIncludesHotel }) {
  const baseTicket = tickets.filter((ticket) => !ticket.isRemote && !ticket.includesHotel);
  const price = baseTicket[0].price / 100;
  return (
    <ButtonsWrappler>
      {tickets.map((ticket, index) => {
        if (!ticket.isRemote) {
          return (
            <BoxButton
              key={index}
              selected={includesHotel === ticket.includesHotel}
              onClick={() => setIncludesHotel(ticket.includesHotel)}
            >
              {ticket.includesHotel ? <h1>Com Hotel</h1> : <h1>Sem Hotel</h1>}
              <h2>+ R$ {ticket.price / 100 - price}</h2>
            </BoxButton>
          );
        }
      })}
    </ButtonsWrappler>
  );
}

function RemoteButtons({ tickets, isRemote, setIsRemote }) {
  return (
    <ButtonsWrappler>
      {tickets.map((ticket, index) => {
        if (!ticket.includesHotel) {
          return (
            <BoxButton key={index} selected={isRemote === ticket.isRemote} onClick={() => setIsRemote(ticket.isRemote)}>
              {ticket.isRemote ? <h1>Online</h1> : <h1>Presencial</h1>}
              <h2>R$ {ticket.price / 100}</h2>
            </BoxButton>
          );
        }
      })}
    </ButtonsWrappler>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const ButtonsWrappler = styled.div`
  display: flex;
  margin-bottom: 40px;
`;
