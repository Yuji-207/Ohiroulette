import React from 'react';

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';


// カード全体をボタンにしたい
const CheckCard = props => {

  const {
    header,
    subheader,
    content,
    handleCheck,
  } = props;

  return (
    <Box m={2}>
      <Card sx={{maxWidth: 345}}>
        <CardHeader
          action={
            <Checkbox
              defaultChecked
              onChange={handleCheck}
            />
          }
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
