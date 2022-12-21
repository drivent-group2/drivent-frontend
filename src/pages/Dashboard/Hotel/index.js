import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotel from '../../../hooks/api/useHotel';
import Room from '../../../components/Dashboard/common/Room';

export default function Hotel() {
  let i = 0;
  const { hotels } = useHotel();

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
            />
          ))}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
