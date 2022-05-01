import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import BasePaper from './components/BasePaper';
import Header from './components/header/Header';
import LinkIconButton from './components/LinkIconButton';
import MainButton from './components/MainButton';
import CustomeList from './components/CustomeList';
import TransferButton from './components/TransferButton';


  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  }


  const App = () => {

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
      <Container sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', height: '100vh', textAlign: 'center'}}>

        {/* リンクボタン */}
        <Box sx={{position: 'fixed', top: 0, right: 0, display: 'flex', padding: '1rem'}}>
          <LinkIconButton title="GitHubを見る" href="https://github.com/Yuji-207/Ohiroulette">
            <GitHubIcon />
          </LinkIconButton>
          <LinkIconButton title="寄付をする" href="https://square.link/u/UHk7emHC">
            <VolunteerActivismIcon />
          </LinkIconButton>
        </Box>

        {/* タイトル */}
        <Typography fontSize={'3rem'} sx={{margin: '2rem 0', }}>
          おひるーれっと
        </Typography>

        <Box sx={{display: 'flex', flexFlow: {xs: 'column', lg: 'row'}, justifyContent: 'space-between', height: '100%', gap: '2rem'}}>
          
          {/* 行くお店 */}
          <BasePaper title="行くお店" width={{xs: 'auto', lg: '40%'}}>
            <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant="h3" component="p">
                {choiced}
              </Typography>
            </Box>
            <Box>
              {turnning ? (
                <MainButton onClick={() => setTurnning(false)}>
                  とめる
                </MainButton>
              ) : (
                <MainButton onClick={() => setTurnning(true)}>
                  まわす
                </MainButton>
              )}
            </Box>
          </BasePaper>

          {/* お店の候補 */}
          <BasePaper title="お店の候補" idth={{sm: 'auto', lg: '40%'}}>
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

          </BasePaper>

        </Box>
      </Container>
    )
  }



export default App;
