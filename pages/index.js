import axios from 'axios';
import React from 'react';

import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemAvatar } from '@mui/material';
import { ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import BasePaper from '@components/BasePaper';
import CustomeList from '@components/CustomeList';
import Header from '@components/header/Header';
import LinkIconButton from '@components/LinkIconButton';
import MainButton from '@components/MainButton';
import TransferButton from '@components/TransferButton';


const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
}

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
}


const Home = ({data, img}) => {

  const [turnning, setTurnning] = React.useState(false);
  const [choiced, setChoiced] = React.useState('今日のお昼は？');
  const [checked, setChecked] = React.useState([]);

  const [left, setLeft] = React.useState([
    '丸亀製麺',
    'みなと庵',
    'PARIYA',
  ]);

  const [right, setRight] = React.useState([
    'CHOTARO',
    '魚',
    'ごはんやごはん',
    '焼肉',
    'ファミマ',
    'サンマルクカフェサンマルクカフェ',
    'ガスト',
    'バーミヤン',
  ]);

  // ルーレット
  React.useEffect(() => {
    if (turnning) {

      let index = 0;

      const timerId = setInterval(() => {
        setChoiced(() => {
          index = index < left.length ? index + 1 : 0;
          setChoiced(left[index]);
        })
      }, 50);
      
      return () => clearInterval(timerId);  

    }
  }, [turnning]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);


  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  return (
    <>
      <Header />
      <Container sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', textAlign: 'center', margin: '5rem 0 8rem 0'}}>
        <Box sx={{display: 'flex', flexFlow: {xs: 'column', lg: 'row'}, justifyContent: 'space-between', height: '100%', gap: '2rem'}}>
          <Paper>
            <Typography variant="h5" component="h2">
              お店の候補
            </Typography>
            <List>
              {data.map((place, i) => (
                <ListItem alignItems="flex-start" key={i}>
                  <ListItemAvatar>
                    <Avatar alt={place.name} src={img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={place.name}
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {'★ ' + place.rating + ' '}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
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

  let data;
  await axios.get('http://localhost:3001/api/place-search')
    .then(res => {
      data = res.data;
    })
    .catch(err => {
      console.log(err);
    });

    let img;
    await axios.get('http://localhost:3001/api/place-search')
      .then(res => {
        img = res.data;
      })
      .catch(err => {
        console.log(err);
      });

  return {
    props: {data, img},
  }

}

  
export default Home;
