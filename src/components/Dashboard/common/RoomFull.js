import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';

export default function RoomFull({ arrayTrueOrFalse, roomId }) {
  return (
    <>
      <RoomBox>
        <h1>{roomId}</h1>
        <PersonBox>
          {arrayTrueOrFalse.map((value) => (
            <BsFillPersonFill size={20.25} color="#8C8C8C" />
          ))}
        </PersonBox>
      </RoomBox>
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
  background: #e9e9e9;

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
