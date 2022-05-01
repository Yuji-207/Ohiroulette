import React from "react";

import { Button } from "@mui/material";


const TransferButton = (props) => {

  const {
    arrow,
    onClick,
    disabled,
  } = props;

  return (
    <Button
      sx={{ my: 0.5 }}
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
    >
      {arrow}
    </Button>
  );
  
}


export default TransferButton;
