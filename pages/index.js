import React from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { List } from '@mui/material';
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


const Home = () => {

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

          {/* お店の候補 */}
          {/* <BasePaper title="お店の候補" width={{sm: 'auto', lg: '50%'}}>
            <Box sx={{display: 'flex', flexFlow: {xs: 'column', lg: 'row'}, justifyContent: 'space-between'}}>
              <CustomeList title="あり" items={left} checked={checked} setChecked={setChecked} />
              <Box sx={{display: 'flex', flexFlow: 'column', justifyContent: 'center', height: '100%'}}>
                <TransferButton
                  arrow=">>"
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                />
                <TransferButton
                  arrow=">"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                />
                <TransferButton
                  arrow="<"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                />
                <TransferButton
                  arrow="<<"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                />
              </Box>
              <CustomeList title="なし" items={right} checked={checked} setChecked={setChecked} />
            </Box>

          </BasePaper> */}

          <Paper>
            <Typography variant="h5" component="h2">
              お店の候補
            </Typography>
            <List>
              test
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
  
export default Home;
