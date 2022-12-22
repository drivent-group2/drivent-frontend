import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import BoxButton from '../../../components/Dashboard/common/BoxButton';
//import useTicketType from '../../../hooks/api/useTicket';
import useTicket from '../../../hooks/api/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import usePaymentByUserId from '../../../hooks/api/usePaymentByUserId';
import PaymentResume from '../../../components/Dashboard/common/PaymentResume';
import NoEnrollment from '../../../components/Dashboard/common/NoEnrollment';
import PaymentBox from '../../../components/Dashboard/common/PaymentBox';
import useTicketType from '../../../hooks/api/useTicketType';
import { useState, useEffect } from 'react';
import Button from '../../../components/Form/Button';
import useCreateTicket from '../../../hooks/api/useCreateTicket';
import { toast } from 'react-toastify';
import PaymentCreditCardPage from './PaymentCreditCardPage';

export default function Payment() {
  const { ticket, getTicket } = useTicket();
  const { enrollment } = useEnrollment();
  const { payment } = usePaymentByUserId();
  const ticketTypes = useTicketType();
  const [isRemote, setIsRemote] = useState(null);
  const [includesHotel, setIncludesHotel] = useState(null);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const { createTickets } = useCreateTicket();
  const [hotelActive, setHotelActive] = useState(false);

  useEffect(() => {
    if (isRemote) setIncludesHotel(null);
  }, [isRemote]);

  async function handleForm(e) {
    e.preventDefault();
    const data = {};
    data.ticketTypeId = ticketTypeId;
    try {
      await createTickets(data);
      await getTicket();
      toast('Ticket reservado!');
    } catch (error) {
      toast('Não foi possível reservar seu ticket!');
    }
  }

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
            <RemoteButtons
              tickets={ticketTypes.tickets}
              isRemote={isRemote}
              setIsRemote={setIsRemote}
              setTicketTypeId={setTicketTypeId}
              setHotelActive={setHotelActive}
            />
          )}
          {isRemote ? (
            <>
              <StyledTypography variant="h6" color="textSecondary">
                Fechado! O Total ficou em{' '}
                <b>R$ {ticketTypes.tickets.find((ticketType) => ticketType.id === ticketTypeId).price / 100}. </b>
                Agora é só confirmar.
              </StyledTypography>
              <FormWrapper onSubmit={handleForm}>
                <SubmitContainer>
                  <Button type="submit">RESERVAR INGRESSO</Button>
                </SubmitContainer>
              </FormWrapper>
            </>
          ) : (
            <>
              <StyledTypography variant="h6" color="textSecondary">
                Ótimo! Agora escolha sua modalidade de hospedagem
              </StyledTypography>
              <HotelButtons
                tickets={ticketTypes.tickets}
                includesHotel={includesHotel}
                setIncludesHotel={setIncludesHotel}
                setTicketTypeId={setTicketTypeId}
                setHotelActive={setHotelActive}
              />
              {hotelActive ? (
                <>
                  <StyledTypography variant="h6" color="textSecondary">
                    Fechado! O Total ficou em{' '}
                    <b>R$ {ticketTypes.tickets.find((ticketType) => ticketType.id === ticketTypeId).price / 100}. </b>
                    Agora é só confirmar.
                  </StyledTypography>
                  <FormWrapper onSubmit={handleForm}>
                    <SubmitContainer>
                      <Button type="submit">RESERVAR INGRESSO</Button>
                    </SubmitContainer>
                  </FormWrapper>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <PaymentCreditCardPage />
      )}
    </>
  );
}
function HotelButtons({ tickets, includesHotel, setIncludesHotel, setTicketTypeId, setHotelActive }) {
  const baseTicket = tickets ? tickets.filter((ticket) => !ticket.isRemote && !ticket.includesHotel) : [];
  const price = baseTicket[0]?.price / 100;
  return (
    <>
      <ButtonsWrappler>
        {tickets?.map((ticket, index) => {
          if (!ticket.isRemote) {
            return (
              <BoxButton
                key={index}
                selected={includesHotel === ticket.includesHotel}
                onClick={() => {
                  setIncludesHotel(ticket.includesHotel);
                  setTicketTypeId(ticket.id);
                  setHotelActive(true);
                }}
              >
                {ticket.includesHotel ? <h1>Com Hotel</h1> : <h1>Sem Hotel</h1>}
                <h2>+ R$ {ticket.price / 100 - price}</h2>
              </BoxButton>
            );
          }
        })}
      </ButtonsWrappler>
    </>
  );
}

function RemoteButtons({ tickets, isRemote, setIsRemote, setTicketTypeId, setHotelActive }) {
  return (
    <ButtonsWrappler>
      {tickets.map((ticket, index) => {
        if (!ticket.includesHotel) {
          return (
            <BoxButton
              key={index}
              selected={isRemote === ticket.isRemote}
              onClick={() => {
                setIsRemote(ticket.isRemote);
                setTicketTypeId(ticket.id);
                setHotelActive(false);
              }}
            >
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
  b {
    font-weight: 700;
  }
`;
const ButtonsWrappler = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SubmitContainer = styled.div`
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const FormWrapper = styled.form`
  display: flex;
`;
