import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import Room from '../../../components/Dashboard/common/Room';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import useCreateBooking from '../../../hooks/api/useCreateBooking';

export default function Hotel() {
  const { createBooking } = useCreateBooking();
  const [clickedRoom, setClickedRoom] = useState({
    id: undefined,
    roomId: undefined,
    isClicked: false,
  });

  let i = 0;
  const { hotels } = useHotel();

  async function insertBooking() {
    const data = {};

    data.roomId = clickedRoom.roomId;
    try {
      await createBooking(data);
      toast('Quarto reservado!');
    } catch (error) {
      toast('Não foi possível reservar seu quarto!');
    }
  }

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

  function hotelArrayTrueOrFalse(hotels) {
    hotels.map((value2) => {
      value2.Rooms.map((value) => {
        bookingArrayTrueOrFalse(value);
      });
    });
  }

  return (
    <>
      {!hotels ? (
        <h1>espera ai</h1>
      ) : (
        <>
          {/* altera o array incluindo o numero de vagas */}
          {hotelVacancy(hotels)}
          {/* adiciona um array de booleanos em cada room, representando lugares vagos e ocupados */}
          {hotelArrayTrueOrFalse(hotels)}

          {console.log(hotels)}

          <StyledTypography variant="h6" color="textSecondary">
            Ótima pedida! Agora escolha seu quarto:
          </StyledTypography>

          {hotels[0].Rooms.map((value, index) => (
            <Room
              key={index}
              index={(i += 1)}
              roomId={value.id}
              arrayTrueOrFalse={value.arrayTrueOrFalse}
              capacity={value.capacity}
              bookings={value.Booking.length}
              setClickedRoom={setClickedRoom}
              clickedRoom={clickedRoom}
            />
          ))}

          <RoomReserveButton onClick={insertBooking}> RESERVAR QUARTO</RoomReserveButton>
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const RoomReserveButton = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;
