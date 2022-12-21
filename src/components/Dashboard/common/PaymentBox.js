import styled from 'styled-components';
import { BsCheckCircle } from 'react-icons/bs';

export default function PaymentBox() {
  return (
    <Wrappler>
      <BsCheckCircle color="#36B853" size={40} />
      <PaymentBoxTexts>
        <h1>Pagamento confirmado!</h1>
        <h2>Prossiga para a escolha de hospedagem e atividades</h2>
      </PaymentBoxTexts>
    </Wrappler>
  );
}

const PaymentBoxTexts = styled.div`
  width: 400px;
  height: 46px;
`;

const Wrappler = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  gap: 20px;

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }
  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #454545;
  }
`;
