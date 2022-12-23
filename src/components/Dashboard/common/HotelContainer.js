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
  background: ${(props) => (props.selected ? '#ffeed2' : '#EBEBEB')};
  border: 1px solid #cecece;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    width: 168px;
    height: 109px;
    min-height: 109px;
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
    margin-bottom: 5px;
  }
  h2 {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-bottom: 2px;
  }
  h3 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-bottom: 3px;
  }
`;
