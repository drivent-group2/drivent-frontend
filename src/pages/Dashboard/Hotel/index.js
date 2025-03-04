import styled from 'styled-components';
import AlertMessage from '../../../components/Dashboard/common/AlertMessage';
import useTicket from '../../../hooks/api/useTicket';
import HotelContainer from '../../../components/Dashboard/common/HotelContainer';
import { Typography } from '@material-ui/core';
import useHotel from '../../../hooks/api/useHotel';
import Room from '../../../components/Dashboard/common/Room';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useCreateBooking from '../../../hooks/api/useCreateBooking';
import { roomTypeName } from '../../../components/Dashboard/HotelList';
import useBooking from '../../../hooks/api/useBooking';
import Button from '../../../components/Form/Button';
import useUpdateBooking from '../../../hooks/api/useUpdateBooking';
import { useEffect } from 'react';

export default function Hotel() {
  const { ticket } = useTicket();
  const { hotels } = useHotel();
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const { createBooking } = useCreateBooking();
  const [clickedRoom, setClickedRoom] = useState({
    id: undefined,
    roomId: undefined,
    isClicked: false,
  });

  const { getBooking } = useBooking();
  const [reloadBooking, setReloadBooking] = useState(false);
  const [booking, setBooking] = useState();

  useEffect(async() => {
    setBooking(await getBooking());
  }, [reloadBooking]);

  const { updateBooking } = useUpdateBooking();
  const [changingRoom, setChangingRoom] = useState(false);

  let i = 0;

  async function insertBooking() {
    const data = {};
    data.roomId = clickedRoom.roomId;
    try {
      await createBooking(data);
      toast('Quarto reservado!');
    } catch (error) {
      toast('Não foi possível reservar seu quarto!');
    }
    setReloadBooking(!reloadBooking);
  }

  async function editBooking() {
    const data = {};
    const oldRoomId = booking.Room.id;
    console.log(booking);

    data.roomId = clickedRoom.roomId;
    try {
      await updateBooking(data, oldRoomId);
      toast('Quarto reservado!');
    } catch (error) {
      toast('Não foi possível reservar seu quarto!');
    }
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

  hotelVacancy(hotels);

  if (!booking) {
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
              {hotelArrayTrueOrFalse(hotels)}

              <RoomsWrappler>
                {hotels.map((hotel) => {
                  if (hotel.id === selectedHotelId) {
                    return hotel.Rooms.map((value, index) => (
                      <Room
                        key={index}
                        index={(i += 1)}
                        roomId={value.id}
                        arrayTrueOrFalse={value.arrayTrueOrFalse}
                        capacity={value.capacity}
                        bookings={value.Booking.length}
                        clickedRoom={clickedRoom}
                        setClickedRoom={setClickedRoom}
                      />
                    ));
                  }
                })}
              </RoomsWrappler>
              <RoomReserveButton onClick={insertBooking}>RESERVAR QUARTO</RoomReserveButton>
            </>
          )}
        </>
      </>
    );
  }
  if (booking) {
    return hotels.map((hotel) => {
      let vacancies = 0;
      hotel.Rooms.map((room) => {
        vacancies += room.Booking.length;
      });
      if (hotel.id !== booking.Room.Hotel.id) {
        return (
          <>
            {changingRoom ? (
              <>
                <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
                <StyledTypography variant="h6" color="textSecondary">
                  Primeiro, escolha seu hotel
                </StyledTypography>
                <HotelWrappler>
                  <HotelsList
                    hotels={hotels}
                    setSelectedHotelId={setSelectedHotelId}
                    selectedHotelId={selectedHotelId}
                  />
                </HotelWrappler>
                <>
                  {selectedHotelId && hotels && (
                    <>
                      <StyledTypography variant="h6" color="textSecondary">
                        Ótima pedida! Agora escolha seu quarto:
                      </StyledTypography>
                      {hotelArrayTrueOrFalse(hotels)}

                      <RoomsWrappler>
                        {hotels.map((hotel) => {
                          if (hotel.id === selectedHotelId) {
                            return hotel.Rooms.map((value, index) => (
                              <Room
                                key={index}
                                index={(i += 1)}
                                roomId={value.id}
                                arrayTrueOrFalse={value.arrayTrueOrFalse}
                                capacity={value.capacity}
                                bookings={value.Booking.length}
                                clickedRoom={clickedRoom}
                                setClickedRoom={setClickedRoom}
                              />
                            ));
                          }
                        })}
                      </RoomsWrappler>
                      <RoomReserveButton onClick={editBooking}>TROCAR QUARTO</RoomReserveButton>
                    </>
                  )}
                </>
              </>
            ) : (
              <>
                <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
                <StyledTypography variant="h6" color="textSecondary">
                  Você já escolheu seu quarto:
                </StyledTypography>
                <HotelContainer>
                  <img src={hotel.image} alt="img" />
                  <h1>{hotel.name}</h1>
                  <Description>
                    <h2>Quarto reservado</h2>
                    <h3>{`${booking.Room.name} (${roomTypeName(booking.Room.capacity)})`}</h3>
                    <h2>Pessoas no seu quarto</h2>
                    <h3>{`${vacancies > 0 ? `Você e mais ${vacancies}` : 'Só você'}`}</h3>
                  </Description>
                </HotelContainer>
                <Button onClick={() => setChangingRoom(true)}>TROCAR DE QUARTO</Button>
              </>
            )}
          </>
        );
      }
    });
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
  function HotelsList({ hotels, setSelectedHotelId, selectedHotelId }) {
    return (
      <>
        {hotels.map((hotel) => (
          <HotelContainer onClick={() => setSelectedHotelId(hotel.id)} selected={selectedHotelId === hotel.id}>
            <img src={hotel.image} alt="hotel_img" />
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

const RoomsWrappler = styled.div`
  display: flex;
`;

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
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
`;
const Description = styled.div``;
