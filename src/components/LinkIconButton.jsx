import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const LinkIconButton = (props) => {

  const {
    title,
    href,
    children,
  } = props;

  return (
    <Tooltip title={title} arrow>
      <IconButton size="large" href={href}>
        {children}
      </IconButton>
    </Tooltip>
  );

}


export default LinkIconButton;
