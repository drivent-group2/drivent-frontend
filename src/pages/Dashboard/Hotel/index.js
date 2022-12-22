import styled from 'styled-components';
import AlertMessage from '../../../components/Dashboard/common/AlertMessage';
import useTicket from '../../../hooks/api/useTicket';
import HotelContainer from '../../../components/Dashboard/common/HotelContainer';
import { Typography } from '@material-ui/core';
import useHotels from '../../../hooks/api/useHotels';
import { useState } from 'react';
export default function Hotel() {
  const { ticket, ticketLoading } = useTicket();
  const { hotels } = useHotels();
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  if (ticketLoading) {
    return 'Carregando....';
  }
  if (!ticket) {
    return <ErrorMessage>Você precisa montar seu ticket antes de fazer a escolha da hospedagem</ErrorMessage>;
  }
  if (ticket.status === 'RESERVED') {
    return <ErrorMessage>Você precisa ter confirmado pagamento antes de fazer a escolha da hospedagem</ErrorMessage>;
  }
  if (ticket.TicketType?.isRemote) {
    return (
      <AlertMessage>
        Sua modalidade de ingresso não inclui hospedagem <br />
        Prossiga para a escolha de atividades
      </AlertMessage>
    );
  }
  if (!hotels) return <ErrorMessage>Estamos sem hoteis para esse evento</ErrorMessage>;
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      <StyledTypography variant="h6" color="textSecondary">
        Primeiro, escolha seu hotel
      </StyledTypography>
      <HotelsList hotels={hotels} setSelectedHotelId={setSelectedHotelId} selectedHotelId={selectedHotelId} />
    </>
  );
}
function HotelsList({ hotels, setSelectedHotelId, selectedHotelId }) {
  return (
    <>
      {hotels.map((hotel) => (
        <HotelContainer onClick={() => setSelectedHotelId(hotel.id)} selected={selectedHotelId === hotel.id}>
          <img src={hotel.image} />
          <h1>{hotel.name}</h1>
        </HotelContainer>
      ))}
    </>
  );
}
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;
