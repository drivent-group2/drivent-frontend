import { useState } from 'react';
import styled from 'styled-components';
import PaymentForm from './creditCardForm';
import { getCardInfo } from '../../../services/paymentApi';
import Vector from '../../../assets/images/Vector.png';
import useToken from '../../../hooks/useToken';
import useTicket from '../../../hooks/api/useTicket';
import useSavePayment from '../../../hooks/api/useSavePayment';

export default function Payment() {
  const token = useToken();
  const [cardMessage, setCardMessage] = useState();
  const { ticket, getTicket, ticketLoading } = useTicket();
  const { savePayment } = useSavePayment();

  async function insertPayment() {
    const cardInfo = getCardInfo();
    if (verifyCardData(cardInfo) === 'invalid') return;
    const body = {
      ticketId: ticket.id,
      cardData: {
        issuer: cardInfo.cardIssuer,
        number: cardInfo.number,
        value: ticket.TicketType.price,
      },
    };
    await savePayment(body, token);
    await getTicket();
  }

  function verifyCardData(cardInfo) {
    if (!cardInfo) {
      setCardMessage('Preencha os campos');
      return 'invalid';
    }
    const invalidCardData =
      cardInfo.number.length !== 16 ||
      cardInfo.issuer === '' ||
      cardInfo.expiry.length !== 4 ||
      cardInfo.cvc.length !== 3 ||
      isNaN(Number(cardInfo.number)) ||
      isNaN(Number(cardInfo.cvc)) ||
      isNaN(Number(cardInfo.expiry));
    if (invalidCardData) {
      setCardMessage('Dados inválidos');
      return 'invalid';
    }
    return 'valid';
  }

  if (ticketLoading) {
    return <>Carregando...</>;
  }

  if(!ticket) {
    return <>Erro, refaça login ou tente mais tarde...</>;
  }

  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      <Subtitle>Ingresso escolhido:</Subtitle>
      <TicketInfo>
        {ticket.TicketType.isRemote === false ? 'Presencial + ' : 'Remoto + '}
        {ticket.TicketType.includesHotel === true ? 'Com hotel' : 'Sem hotel'}
        <div>{`R$${ticket.TicketType.price / 100}`}</div>
      </TicketInfo>
      <Subtitle>Pagamento</Subtitle>

      {ticket.status === 'PAID' ? (
        <PaymentComplete>
          <img src={Vector} />
          <div>
            <div>Pagamento Confirmado!</div>
            <div>Prossiga pra escolha de hospedagem e atividades</div>
          </div>
        </PaymentComplete>
      ) : (
        <>
          <PaymentForm />
          <ErrorMessage>{cardMessage}</ErrorMessage>
          <ButtonPayment onClick={insertPayment}>Finalizar pedido</ButtonPayment>
        </>
      )}
    </>
  );
}

const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  margin-bottom: 30px;
`;

const Subtitle = styled.div`
  color: #8e8e8e;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  margin-bottom: 20px;
`;

const TicketInfo = styled.div`
  background-color: #ffeed2;
  border-radius: 20px;
  width: 290px;
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #454545;
  font-size: 16px;
  margin-bottom: 20px;
  div {
    margin-top: 8px;
    color: #898989;
    font-size: 14px;
  }
`;

const ButtonPayment = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;

const PaymentComplete = styled.div`
  width: 80%;
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    margin-left: 5px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  margin-bottom: 15px;
`;
