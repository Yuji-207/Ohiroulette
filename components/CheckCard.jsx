import React from 'react';

import { Box } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Typography } from '@mui/material';


// カード全体をボタンにしたい
const CheckCard = props => {

  const {
    id,  // 廃止したい
    header,
    subheader,
    content,
    onChange,
  } = props;

  return (
    <Box m={2}>
      <Card sx={{maxWidth: 345}}>
        <CardHeader
          action={onChange !== undefined && (
            <Checkbox
              id={id}
              defaultChecked
              onChange={onChange}
            />
          )}
          title={
            <Typography
              variant="subtitle1"
              component="h3"
              align="left"
              color="text.secondary"
            >
              {header}
            </Typography>
          }
          subheader={
            <Typography
              variant="subtitle2"
              component="p"
              align="left"
              color="text.secondary"
            >
              {subheader}
            </Typography>
          }
        />
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt={place.name}
        /> */}
        <CardContent>
          <Typography
            variant="caption"
            component="p"
            align="left"
            color="text.secondary"
          >
            {content}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">詳しく見る</Button>
        </CardActions> */}
      </Card>
    </Box>
  )

};


export default CheckCard;
