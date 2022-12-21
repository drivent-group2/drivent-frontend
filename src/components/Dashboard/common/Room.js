import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { BsPerson } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import RoomFull from './RoomFull';

export default function Room({ key, index, roomId, arrayTrueOrFalse, capacity, bookings }) {
  let Full = capacity - bookings;
  let isFull = false;
  if (Full === 0) {
    isFull = true;
  }

  return (
    <>
      {isFull ? (
        <>
          <RoomFull roomId={index} />
        </>
      ) : (
        <>
          <RoomBox>
            <h1>{index}</h1>
            <PersonBox>
              {arrayTrueOrFalse.map((value, index) => {
                if (value) {
                  return <BsFillPersonFill key={index} size={20.25} />;
                } else {
                  return <BsPerson key={index} size={20.25} />;
                }
              })}
            </PersonBox>
          </RoomBox>
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

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
