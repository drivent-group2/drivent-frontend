import styled from 'styled-components';
export default function ResumeBox({ children, selected }) {
  return <Wrappler>{children}</Wrappler>;
}

const Wrappler = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 290px;
  height: 108px;
  border-radius: 20px;
  background: #ffeed2;

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
