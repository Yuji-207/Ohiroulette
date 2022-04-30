import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Tooltip,
    Typography,
    Paper,
  } from '@mui/material';

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
          <Tooltip title="GitHubを見る" arrow>
            <IconButton size="large" href="https://github.com/Yuji-207/Ohiroulette">
              <i className="fa fa-github"></i>
            </IconButton>
          </Tooltip>
          <Tooltip title="寄付をする" arrow>
            <IconButton size="large" href="https://square.link/u/UHk7emHC">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}} >
                volunteer_activism
              </span>
            </IconButton>
        </Tooltip>
        </Box>

        {/* タイトル */}
        <Typography variant="h1" sx={{margin: '2rem'}}>
          おひるーれっと
        </Typography>

        {/* 行くお店 */}
        <Box sx={{display: 'flex', justifyContent: 'space-between', height: '100%', gap: '2rem'}}>
          <Paper sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', gap: '2rem', width: '40%', padding: '3rem'}}>
            <Typography variant="h4" component="h2">
              行くお店
            </Typography>
            <Typography variant="h3" component="p">
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
          </Paper>

          {/* お店の候補 */}
          <Paper sx={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', gap: '2rem', width: '50%', padding: '3rem'}}>
            <Typography variant="h4" component="h2" >
              お店の候補
            </Typography>
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

          </Paper>

        </Box>
      </Container>
    )
  }



export default App;
