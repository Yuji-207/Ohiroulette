import axios from 'axios';
import Confetti from 'react-confetti'
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

import getLocation from '@utils/get-location';





const Home = (props) => {


  const [places, setPlaces] = React.useState(props.places);
  const [checked, setChecked] = React.useState(Array(places.length).fill(true));
  const [button, setButton] = React.useState('まわす');
  const [location, setLocation] = React.useState([]);

  // 現在地を取得
  React.useEffect(() => {
    (async () => {
      const location = await getLocation();
      if (location.length > 0) {
        setLocation(location);
      } else {
        console.log('現在地が取得できませんでした')
      }
    })()
  }, []);

  console.log(location)

  // ルーレット
  React.useEffect(() => {
    if (button === 'とめる') {
      const timerId = setInterval(() => {

        const copiedPlaces = [...places];
        const copiedChecked = [...checked];
        const trueCount = checked.filter(e => e === true).length;

        if (trueCount >= 2) {

          const index = checked.slice(1).indexOf(true) + 1;

          const frontPlaces = copiedPlaces.slice(0, index);
          const backPlaces = copiedPlaces.slice(index);
          copiedPlaces = backPlaces.concat(frontPlaces);

          const frontChecked = copiedChecked.slice(0, index);
          const backChecked = copiedChecked.slice(index);
          copiedChecked = backChecked.concat(frontChecked);

        } else {

          // エラー出したい

          const index = checked.indexOf(true);

          const frontPlaces = copiedPlaces.slice(0, index);
          const backPlaces = copiedPlaces.slice(index);
          copiedPlaces = backPlaces.concat(frontPlaces);

          const frontChecked = copiedChecked.slice(0, index);
          const backChecked = copiedChecked.slice(index);
          copiedChecked = backChecked.concat(frontChecked);

        }

        setPlaces(copiedPlaces);
        setChecked(copiedChecked);

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
      setChecked(Array(places.length).fill(true));  // リセットしたくない checkedで管理したい
      setButton('まわす');
    }
  }


  return (
    <>
      <Header />
      {button === 'りせっと' && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          confettiSource={{x: 0, y: window.innerHeight, w: window.innerWidth, h:0}}
          initialVelocityY={20}
          gravity={0.2}
        />
      )}
      <Container sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', textAlign: 'center', margin: '5rem 0 8rem 0'}}>
        <Typography variant="h5" component="h2" m={2}>
          {button === 'まわす' ? '候補のお店をえらぶ' : button === 'とめる' ? '今日のお昼は？' : 'ここだよ！'}
        </Typography>
        {places.map((place, i) => (
          button === 'まわす' ? (
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
                  <Typography variant="caption" component="p" align="left" color="text.secondary">
                    {place.vicinity}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">詳しく見る</Button>
                </CardActions> */}
              </Card>
            </Box>
          ) : button === 'とめる' ? checked[i] && (
            <Box key={i} m={2}>
              <Card sx={{maxWidth: 345}}>
                <CardHeader
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
          ) : button === 'りせっと' && i === 0 &&(
            <Box key={i} m={2}>
            <Card sx={{maxWidth: 345}}>
              <CardHeader
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

  await axios.get('http://localhost:3000/api/place-search')
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
