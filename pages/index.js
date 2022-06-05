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
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

import Header from '@components/header/Header';
import PrimaryButton from '@components/PrimaryButton';

import getLocation from '@utils/get-location';
import CheckCard from '@components/CheckCard';





const Home = () => {


  const [places, setPlaces] = React.useState([]);
  const [checked, setChecked] = React.useState([]);  // placesに統合する
  const [button, setButton] = React.useState('');


  // 現在地を取得
  React.useEffect(() => {
    (async () => {
      const location = await getLocation();
      if (location.length === 2 && typeof document !== undefined) {
        await axios.get(document.location.origin + '/api/place-search?location=' + location.join(','))  // BASE_URLの設定方法を変更したい
        .then(res => {
          const places = res.data.places;
          setPlaces(places);
          setChecked(Array(places.length).fill(true));
          setButton('まわす');
        })
        .catch(err => {
          console.log({err});
        });
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
          confettiSource={{
            x: 0,
            y: window.innerHeight,
            w: window.innerWidth,
            h: 0,
          }}
          initialVelocityY={20}
          gravity={0.2}
        />
      )}
      <Container sx={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        margin: '5rem 0 8rem 0',
      }}>
        <Typography variant="h5" component="h2" m={2}>
        {button === 'まわす' ? (
          '候補のお店をえらぶ'
        ) : button === 'とめる' ? (
          '今日のお昼は？'
        ) : button === 'りせっと' ? (
          'ここだよ！'
        ) : (
          '現在地を取得しています…'
        )}
        </Typography>
        {places.length === 0 && [...Array(5).keys()].map((key) => (
          <CheckCard
            key={key}
            header={<Skeleton animation="wave" width="80%" />}
            subheader={<Skeleton animation="wave" width="40%" />}
            content={
              <>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" width="80%" />
              </>
            }
          />
        ))}
        {places.map((place, i) => (
          button === 'まわす' ? (
            <CheckCard
              key={i}
              id={'checkbox-' + i}
              header={place.name}
              subheader={'★ ' + place.rating + ' ー ここから徒歩 ' + place.distance + '分'}
              content={place.vicinity}
              onChange={handleCheck}
            />
          ) : button === 'とめる' ? checked[i] && (
            <CheckCard
              key={i}
              header={place.name}
              subheader={'★ ' + place.rating + ' ー ここから徒歩 ' + place.distance + '分'}
              content={place.vicinity}
            />
          ) : button === 'りせっと' && i === 0 &&(
            <CheckCard
              key={i}
              header={place.name}
              subheader={'★ ' + place.rating + ' ー ここから徒歩 ' + place.distance + '分'}
              content={place.vicinity}
            />
          )
        ))}
      </Container>
      {button !== '' && (
        <PrimaryButton onClick={handleClick}>
          {button}
        </PrimaryButton>
      )}
    </>
  )
}

  
export default Home;
