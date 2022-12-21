import { Typography } from '@material-ui/core';
import styled from 'styled-components';
export default function AlertMessage({ children }) {
  return (
    <AlertContainer>
      <StyledTypography variant="h5" color="textSecondary">
        {children}
      </StyledTypography>
    </AlertContainer>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const AlertContainer = styled.div`
height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
