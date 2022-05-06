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
  const [checked, setChecked] = React.useState(Array(places.length).fill(true));
  const [button, setButton] = React.useState('まわす');

  // ルーレット
  React.useEffect(() => {
    if (button === 'とめる') {
      const timerId = setInterval(() => {
        const copied = [...places];
        const shifted = copied.shift();
        copied.push(shifted);
        setPlaces(copied);
      }, 30);
      return () => clearInterval(timerId);
    }
  }, [button, places]);


  const handleCheck = e => {
    const copied = [...checked];
    const index = String((e.target.id).slice(9));
    copied[index] = e.target.checked;
    setChecked(copied);
  }

  

  const handleClick = () => {
    if (button === 'まわす') {
      setButton('とめる');
    } else if (button === 'とめる') {
      setButton('りせっと');
    } else {
      places.sort((a, b) => a.distance - b.distance);
      setButton('まわす');
    }
  }


  return (
    <>
      <Header />
      <Container sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', textAlign: 'center', margin: '5rem 0 8rem 0'}}>
 
        <Typography variant="h5" component="h2" m={2}>
          {button === 'まわす' ? '候補のお店をえらぶ' : button === 'とめる' ? '今日のお昼は？' : 'ここだよ！'}
        </Typography>
        {places.map((place, i) => (
          !(button === 'りせっと' && i > 0) && (
            <Box key={i} m={2}>
              <Card sx={{maxWidth: 345}}>
                <CardHeader
                  action={
                    <Checkbox id={'checkbox-' + i} defaultChecked onChange={handleCheck} />
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
          )
        ))}
      </Container>
      <Box m={3} sx={{position: 'fixed', inset: 'auto 0 0 0', display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" onClick={handleClick}>
          <Typography variant="h4" component="p" p={2}>
            {button}
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
