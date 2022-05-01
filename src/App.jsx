import React from 'react';

import {
    Box,
    Button,
    Checkbox,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Paper,
  } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import LinkIconButton from './components/LinkIconButton';
import BasePaper from './components/BasePaper';


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


    const handleToggle = value => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

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


    const customList = items => (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );
    
    return (
      <Container sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', height: '100vh', textAlign: 'center', padding: '3rem'}}>

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
        <Typography variant="h1" sx={{margin: '2rem'}}>
          おひるーれっと
        </Typography>

        <Box sx={{display: 'flex', justifyContent: 'space-between', height: '100%', gap: '2rem'}}>
          
          {/* 行くお店 */}
          <BasePaper title="行くお店" width="40%">
            <Typography variant="h3" component="p" sx={{height: '10rem'}}>
              {choiced}
            </Typography>
            <Box>
              {turnning ? (
                <Button variant="contained" onClick={() => setTurnning(false)} sx={{padding: '2rem', margin: '2rem'}}>
                  <Typography variant="h4" component="p" align="center">
                    とめる
                  </Typography>
                </Button>
              ) : (
                <Button variant="contained" onClick={() => setTurnning(true)} sx={{padding: '2rem', margin: '2rem'}}>
                  <Typography variant="h4" component="p" align="center">
                    まわす
                  </Typography>
                </Button>
              )}
            </Box>
          </BasePaper>

          {/* お店の候補 */}
          <BasePaper title="お店の候補" width="50%">
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box>
                <Typography variant="h5" component="h3">
                    あり
                </Typography>
                {customList(left)}
              </Box>
              <Box>
                <Box sx={{display: 'flex', flexFlow: 'column', justifyContent: 'center', height: '100%'}}>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                  >
                    ≫
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                  >
                    ≪
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" component="h3">
                    なし
                </Typography>
                {customList(right)}
                </Box>
            </Box>

          </BasePaper>

        </Box>
      </Container>
    )
  }



export default App;
