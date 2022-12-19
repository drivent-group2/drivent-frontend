import { useState, useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import { getUserTicket } from '../../../services/ticketApi';
import PaymentForm from './creditCardForm';
import Cards from 'react-credit-cards';
import { getCardInfo, savePayment } from '../../../services/paymentApi';
import Vector from '../../../assets/images/Vector.png';

export default function Payment() {
  const [ticket, setTicket] = useState('Carregando...');
  const { userData } = useContext(UserContext);

  useEffect(async() => {
    if (userData) {
      const getTicket = await getUserTicket(userData.token);
      setTicket(getTicket);
    }
  }, []);

  async function insertPayment() {
    const cardInfo = getCardInfo();
    const body = {
      ticketId: ticket.id,
      cardData: {
        issuer: cardInfo.cardIssuer,
        number: cardInfo.number,
        value: ticket.TicketType.price,
      },
    };
    console.log(body);
    await savePayment(body, userData.token);
  }

  if (ticket === 'Carregando...') {
    return <>{ticket}</>;
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
