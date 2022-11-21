import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const PrimaryButton = props => {

  const {
    onClick,
    children,
  } = props;

  return (
    <Box m={3} sx={{
      position: 'fixed',
      inset: 'auto 0 0 0',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button variant="contained" onClick={onClick}>
        <Typography variant="h4" component="p" p={2}>
          {children}
        </Typography>
      </Button>
    </Box>
  )

};


export default PrimaryButton;
