import React from "react";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const HeaderIcon = (props) => {

  const {
    title,
    href,
    tooltipProps,
    iconButtonProps,
    children,
  } = props;

  return (
    <Tooltip title={title} arrow {...tooltipProps}>
      <IconButton
        size="large"
        color="inherit"
        href={href}
        {...iconButtonProps}
      >
        {children}
      </IconButton>
    </Tooltip>
  );

}


export default HeaderIcon;
