import { useState, useContext } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import { getUserTicket } from '../../../services/ticketApi';
import PaymentForm from './creditCardForm';

export default function Payment() {
  const [ticket, setTicket] = useState('Carregando...');
  const { userData } = useContext(UserContext);

  useEffect(async() => {
    if (userData) {
      const getTicket = await getUserTicket(userData.token);
      setTicket(getTicket);
    }
  }, []);

  if (ticket === 'Carregando...') {
    return (
      <>
        {ticket}
      </>
    );
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
      <PaymentForm/>
    </>
  );
}

const Title = styled.div`
  font-family: 'Roboto',sans-serif;
  font-size: 34px;
  margin-bottom: 30px;
`;

const Subtitle = styled.div`
  color: #8E8E8E;
  font-family: 'Roboto',sans-serif;
  font-size: 20px;
  margin-bottom: 20px;
`;

const TicketInfo = styled.div`
  background-color: #FFEED2;
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
  div{
    margin-top: 8px;
    color: #898989;
    font-size: 14px;
  }
`;
