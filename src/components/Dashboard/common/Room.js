import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import RoomFull from './RoomFull';

export default function Room({
  key,
  index,
  roomId,
  arrayTrueOrFalse,
  capacity,
  bookings,
  setClickedRoom,
  clickedRoom,
}) {
  const clicked = () => {
    if (clickedRoom.id === index) {
      for (let i = arrayTrueOrFalse.length; i >= 0; i--) {
        if (arrayTrueOrFalse[i] === false) {
          arrayTrueOrFalse[i] = 'selected';
          return true;
        }
      }
    }

    return false;
  };

  const selectRoom = (index) => {
    setClickedRoom({
      id: index,
      roomId,
      isClicked: true,
    });
  };

  let Full = capacity - bookings;
  let isFull = false;
  if (Full === 0) {
    isFull = true;
  }

  return (
    <>
      {isFull ? (
        <>
          <RoomFull arrayTrueOrFalse={arrayTrueOrFalse} roomId={index} />
        </>
      ) : (
        <>
          <RoomBox isClicked={clicked()} onClick={() => selectRoom(index)}>
            <h1>{index}</h1>
            <PersonBox>
              {arrayTrueOrFalse.map((value, index) => {
                if (value === true) {
                  return <BsFillPersonFill key={index} size={20.25} />;
                } else if (value === false) {
                  return <BsPerson key={index} size={20.25} />;
                } else {
                  return <BsFillPersonFill key={index} size={20.25} color="#FF4791" />;
                }
              })}
            </PersonBox>
          </RoomBox>
        </>
      )}
    </>
  );
}

const RoomBox = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cecece;
  border-radius: 10px;
  width: 190px;
  height: 45px;
  margin-bottom: 10px;
  margin-right: 15px;
  background: ${({ isClicked }) => (isClicked ? '#ffeed2' : '#ffffff')};
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 19px;
    color: #454545;
  }
`;

const PersonBox = styled.div`
  width: 61px;
  height: 45px;
  display: flex;
  justify-content: end;
  align-items: center;
`;
