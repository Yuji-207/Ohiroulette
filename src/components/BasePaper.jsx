import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from '@mui/material/styles/styled';


const StyledPaper = styled(Paper)(() => ({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'space-between',
  gap: '2rem',
  padding: '3rem',
}));


const StyledBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'space-evenly',
}));


const BasePaper = (props) => {
  
  const {
    title,
    width,
    children,
  } = props;

  return (
    <StyledPaper sx={{width: width}}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <StyledBox>
        {children}
      </StyledBox>
    </StyledPaper>
  );

}


export default BasePaper;
