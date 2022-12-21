import styled from 'styled-components';
export default function NoEnrollment({ children, selected }) {
  return <Wrappler>{children}</Wrappler>;
}

const Wrappler = styled.div`
  position: absolute;
  width: 400px;
  height: 46px;
  left: 250px;
  top: 320px;
  text-align: center;
`;
