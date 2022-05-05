import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';


const StyledButton = styled(Button)(() => ({
  padding: '2rem',
  margin: '2rem',
}));


const MainButton = (props) => {

  const {
    onClick,
    children,
  } = props;

  return (
    <StyledButton variant="contained" onClick={onClick}>
      <Typography variant="h4" component="p" align="center">
        {children}
      </Typography>
    </StyledButton>
  );

}


export default MainButton;
