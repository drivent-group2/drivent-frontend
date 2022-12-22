import styled from 'styled-components';
export default function HotelContainer({ onClick, selected, children }) {
  return (
    <Wrappler onClick={onClick} selected={selected}>
      {children}
    </Wrappler>
  );
}

const Wrappler = styled.div`
box-sizing: border-box;
  width: 196px;
  height: 264px;
  background: ${(props) => (props.selected ? '#ffeed2' : 'none')};
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 14px;
  cursor: pointer;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  h1 {
    color: #343434;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
  }
`;

