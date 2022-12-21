import styled from 'styled-components';
export default function NoEnrollment({ children, selected }) {
  return <Wrappler>{children}</Wrappler>;
}

const Wrappler = styled.div`
  position: absolute;
  width: 400px;
  height: 46px;
  left: 460px;
  top: 400px;
  text-align: center;
`;
