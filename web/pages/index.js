import axios from 'axios';
import Confetti from 'react-confetti'
import React from 'react';

import Box from '@mui/material/Box';
import { Button, Link, Stack } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardHeader } from '@mui/material';
// import { CardMedia } from '@mui/material';
import { Checkbox } from '@mui/material';
import Container from '@mui/material/Container';
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

import Header from '@components/header/Header';

import calcDistance from '@utils/calc-distance';
import getLocation from '@utils/get-location';


const Home = () => {


  const [places, setPlaces] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [button, setButton] = React.useState('');


  // // 現在地を取得
  // React.useEffect(() => {
  //   (async () => {
  //     const location = await getLocation();
  //     if (location.length === 2 && typeof document !== undefined) {
  //       await axios.get(`http://127.0.0.1:8000/places/near?latitude=${location[0]}&longitude=${location[1]}`)  // BASE_URLの設定方法を変更したい
  //       .then(res => {
  //         const places = res.data;
  //         setPlaces(places);
  //         setChecked(Array(places.length).fill(true));
  //         setButton('まわす');
  //       })
  //       .catch(err => {
  //         console.log({err});
  //       });
  //     }
  //   })();
  // }, []);

    // 一時的な店舗取得
    const place_ids = [
      'ChIJfZGP0UJcGGARcJr6fitijNU',  // 築地食堂源ちゃん
      'ChIJfZGP0UJcGGAR1AnzRqMEGQ8', // お盆でご飯
      'ChIJG4bw41xcGGARdggvgYmahfk', // スンドゥブ
      'ChIJfZGP0UJcGGART0y4nWvHEmw', // 石窯やハンバーグ
      'ChIJW0Me61xcGGARybJrhxbnO3w', // 東急スクエア　焼肉　還元
      'ChIJTxD-61xcGGARtbugOnAiii4', // サボテン
      'ChIJ_ZR4j1xcGGARqx6F9Du2Dpo', // ニンニク
      'ChIJj_4K6VxcGGARuRLDxyZTi1A', // カザーナ　カレー
      'ChIJgXz0jS9dGGARqrifsw0rWLY', // 天塩ご飯　げん
      'ChIJ7ZzAEdtdGGAR4uJEM2UrM3Q', //みなとみらい食堂
      'ChIJEaFmc11cGGARF3VTM4IfED8', //ランドマーク　ぼてじゅう
    ];

    React.useEffect(() => {
      (async () => {
        const location = await getLocation();
        if (location.length === 2 && typeof document !== undefined) {
          const places_tmp = [];
          for (const place_id of place_ids) {
            await axios.get(`http://127.0.0.1:8000/places/${place_id}`)
            .then(res => {
              const data = res.data;
              data.distance = calcDistance(location[0], location[1], data.latitude, data.longitude);
              places_tmp.push(res.data);
            })
            .catch(err => {
              console.log({err});
            });
          }
          setPlaces(places_tmp)
          setChecked(Array(places.length).fill(true));
          setButton('まわす');
        }
      })();
    }, []);


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
      setButton('やり直す');
    } else {
      places.sort((a, b) => a.distance - b.distance);
      setChecked(Array(places.length).fill(true));  // リセットしたくない checkedで管理したい
      setButton('まわす');
    }
  }


  return (
    <>
      <Header />
      {button === 'やり直す' && (
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
        {button === 'まわす' ? (
          '候補のお店をえらぶ'
        ) : button === 'とめる' ? (
          '今日のお昼は？'
        ) : button === 'やり直す' ? (
          'ここだよ！'
        ) : (
          '現在地を取得しています…'
        )}
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
        >
          {places.length === 0 && [...Array(5).keys()].map((key) => (
            <Box key={key}>
              <Card sx={{width: 345, mx: 'auto'}}>
                <CardHeader
                  title={
                    <Typography variant="subtitle1" component="h3" align="left" color="text.secondary">
                      <Skeleton animation="wave" width="80%" />
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" component="p" align="left"color="text.secondary">
                      <Skeleton animation="wave" width="40%" />
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
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" width="80%" />
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">詳しく見る</Button>
                </CardActions> */}
              </Card>
            </Box>
          ))}
          {places.map((place, i) => (
            button === 'まわす' ? (
              <Box key={i}>
                <Card sx={{width: 345, mx: 'auto'}}>
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
                  <CardActions>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.id}`}
                      target="_blank"
                    >
                      Google マップで見る
                    </Link>
                  </CardActions>
                </Card>
              </Box>
            ) : button === 'とめる' ? checked[i] && (
              <Box key={i}>
                <Card sx={{width: 345, mx: 'auto'}}>
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
                    <Typography variant="caption" component="p" align="left" color="text.secondary">
                      {place.vicinity}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">詳しく見る</Button>
                  </CardActions> */}
                </Card>
              </Box>
            ) : button === 'やり直す' && i === 0 &&(
              <Box key={i}>
              <Card sx={{width: 345, mx: 'auto'}}>
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
                  <Typography variant="caption" component="p" align="left" color="text.secondary">
                    {place.vicinity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.id}`}
                    target="_blank"
                  >
                    Google マップを開く
                  </Link>
                </CardActions>
              </Card>
            </Box>
            )
          ))}
        </Stack>
      </Container>
      {button !== '' && (
        <Box m={3} sx={{position: 'fixed', inset: 'auto 0 0 0', display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" onClick={handleClick}>
            <Typography variant="h4" component="p" p={2}>
              {button}
            </Typography>
          </Button>
        </Box>
      )}
    </>
  )
}

  
export default Home;
