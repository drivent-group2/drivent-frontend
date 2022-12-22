import styled from 'styled-components';
import AlertMessage from '../../../components/Dashboard/common/AlertMessage';
import useTicket from '../../../hooks/api/useTicket';
import HotelContainer from '../../../components/Dashboard/common/HotelContainer';
import { Typography } from '@material-ui/core';
import useHotel from '../../../hooks/api/useHotel';
import { useState } from 'react';
import Room from '../../../components/Dashboard/common/Room';
export default function Hotel() {
  const { ticket, ticketLoading } = useTicket();
  let i = 0;
  const { hotels } = useHotel();
  const [selectedHotelId, setSelectedHotelId] = useState(null);

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
      <HotelWrappler>
        <HotelsList hotels={hotels} setSelectedHotelId={setSelectedHotelId} selectedHotelId={selectedHotelId} />
      </HotelWrappler>
      <>
        {selectedHotelId && hotels && (
          <>
            <StyledTypography variant="h6" color="textSecondary">
              Ótima pedida! Agora escolha seu quarto:
            </StyledTypography>
            {hotelVacancy(hotels)}
            {hotelArrayTrueOrFalse(hotels)}

            {hotels.map((hotel) => {
              if (hotel.id == selectedHotelId) {
                return hotel.Rooms.map((value, index) => (
                  <Room
                    key={index}
                    index={(i += 1)}
                    roomId={value.id}
                    arrayTrueOrFalse={value.arrayTrueOrFalse}
                    capacity={value.capacity}
                    bookings={value.Booking.length}
                  />
                ));
              }
            })}
          </>
        )}
      </>
    </>
  );

  function hotelVacancy(hotels) {
    hotels.map((value2) => {
      let capacity = 0;
      let booking = 0;

      value2.Rooms.map((value) => {
        capacity += value.capacity;
        booking += value.Booking.length;
      });
      value2.vacancy = capacity - booking;
    });
  }

  function bookingArrayTrueOrFalse(room) {
    let bookingArr = [];
    let contador = room.capacity;

    for (let i = 0; i < room.capacity; i++) {
      if (contador === room.Booking.length) {
        bookingArr.push(true);
      } else {
        bookingArr.push(false);
        contador--;
      }
    }
    room.arrayTrueOrFalse = bookingArr;
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
  function hotelArrayTrueOrFalse(hotels) {
    hotels.map((value2) => {
      value2.Rooms.map((value) => {
        bookingArrayTrueOrFalse(value);
      });
    });
  }
}
const HotelWrappler = styled.div`
  display: flex;
`;

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
