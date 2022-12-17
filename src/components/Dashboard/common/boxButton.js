import styled from 'styled-components';
export default function BoxButton({ onClick, selected, children }) {
  return (
    <Wrappler onClick={onClick} selected={selected}>
      {children}
    </Wrappler>
  );
}

const Wrappler = styled.div`
  width: 145px;
  height: 145px;
  background: ${(props) => (props.selected ? '#ffeed2' : 'none')};
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 24px;

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;
