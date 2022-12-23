import HotelContainer from './common/HotelContainer';
import styled from 'styled-components';
export default function HotelsList({ hotels, setSelectedHotelId, selectedHotelId }) {
  return (
    <>
      {hotels.map((hotel) => {
        let vacancies = 0;
        const accommodationTypesHash = {};
        let accommodationTypes = [];
        hotel.Rooms.map((room) => {
          if (!accommodationTypesHash[room.capacity]) {
            accommodationTypesHash[room.capacity] = true;
            const typeName = roomTypeName(room.capacity);
            accommodationTypes.push(typeName);
          }
          vacancies += room.capacity;
          vacancies -= room.Booking.length;
        });
        return (
          <HotelContainer onClick={() => setSelectedHotelId(hotel.id)} selected={selectedHotelId === hotel.id}>
            <img src={hotel.image} />
            <h1>{hotel.name}</h1>
            <Description>
              <h2>Tipos de acomodação:</h2>
              <h3>{accommodationTypes.join(', ')}</h3>
              <h2>Vagas disponíveis:</h2>
              <h3>{vacancies}</h3>
            </Description>
          </HotelContainer>
        );
      })}
    </>
  );
}
function roomTypeName(capacity) {
  switch (capacity) {
  case 1:
    return 'Single';
  case 2:
    return 'Double';
  case 3:
    return 'Triple';
  case 4:
    return 'Quadruple';
  case 5:
    return 'Quintuple';
  default:
    return 'Group';
  }
}

const Description = styled.div``;
