import axios from 'axios';
import React from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardHeader } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Checkbox } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Header from '@components/header/Header';


const Home = (props) => {

  const [places, setPlaces] = React.useState(props.places);
  const [checked, setChecked] = React.useState([]);
  const [turnning, setTurnning] = React.useState(false);
  const [choiced, setChoiced] = React.useState('今日のお昼は？');

  // ルーレット
  React.useEffect(() => {
    if (turnning) {

      let index = 0;

      const timerId = setInterval(() => {
        setChoiced(() => {
          index = index < checked.length ? index + 1 : 0;
          setChoiced(checked[index]);
        })
      }, 50);
      
      return () => clearInterval(timerId);  

    }
  }, [turnning]);

  return (
    <>
      <Header />
      <Container sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', textAlign: 'center', margin: '5rem 0 8rem 0'}}>
        <Typography variant="h5" component="h2" m={2}>
          候補のお店を選択
        </Typography>
        {places.map((place, i) => (
          <Box key={i} m={2}>
            <Card sx={{maxWidth: 345}}>
              <CardHeader
                action={
                  <Checkbox defaultChecked />
                }
                title={
                  <Typography variant="subtitle1" component="h3" align="left" color="text.secondary">
                    {place.name}
                  </Typography>
                }
                subheader={
                  <Typography variant="subtitle2" component="p" align="left"color="text.secondary">
                    {'★ ' + place.rating + ' ー ここから ' + place.distance + ' m'}
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
                <Typography variant="caption" align="left" color="text.secondary">
                  {place.vicinity}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">詳しく見る</Button>
              </CardActions> */}
            </Card>
          </Box>
        ))}
      </Container>
      <Box m={3} sx={{position: 'fixed', inset: 'auto 0 0 0', display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained">
          <Typography variant="h4" component="p" p={2}>
            まわす
          </Typography>
        </Button>
      </Box>
    </>
  )
}


export const getServerSideProps = async context => {

  let places = [];
  let img = 'img';

  await axios.get('http://localhost:3001/api/place-search')
    .then(res => {
      places = res.data.places;
    })
    .catch(err => {
      console.log(err);
    });

  return {
    props: {places, img},
  }

}

  
export default Home;
