import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const LinkIconButton = (props) => {

  const {
    title,
    href,
    size,
    sx,
    children,
  } = props;

  return (
    <Tooltip title={title} arrow>
      <IconButton size="large" href={href} sx={sx}>
        {children}
      </IconButton>
    </Tooltip>
  );

}


export default LinkIconButton;
