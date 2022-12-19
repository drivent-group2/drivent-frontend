import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import Payment from './index';

export default class PaymentForm extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer: issuer });
    }
    console.log(issuer);
  };

  insertPayment = () => {
    const paymentInfo = {
      cardIssuer: this.state.issuer,
      cardLastDigits: this.state.number.slice(-4),
    };
    console.log(paymentInfo);
    return paymentInfo;
  };

  render() {
    return (
      <>
        <CardContainer id="PaymentForm">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
            callback={this.handleCallback}
          />
          <Form>
            <InputCardNumber
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <div>E.g.: 49..., 51..., 36..., 37...</div>
            <InputCardName
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <InputCardDate
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <InputCardCVC
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              pattern="\d{3,4}"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </Form>
        </CardContainer>
        <ButtonPayment onClick={this.insertPayment}>Finalizar pedido</ButtonPayment>
      </>
    );
  }
}

const Form = styled.form`
  div {
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 20px;
    color: gray;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
`;

const InputCardNumber = styled.input`
  height: 40px;
  width: 50%;
  margin-left: 20px;
  margin-right: 50%;
  border-radius: 5px;
  font-size: 18px;
`;

const InputCardCVC = styled.input`
  height: 40px;
  width: 17%;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 18px;
`;

const InputCardName = styled.input`
  height: 40px;
  width: 50%;
  margin-left: 20px;
  margin-right: 50%;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 18px;
`;

const InputCardDate = styled.input`
  height: 40px;
  width: 30%;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 18px;
`;

const ButtonPayment = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
  border: none;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;
