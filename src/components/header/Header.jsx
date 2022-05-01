import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import styled from '@mui/system/styled';

import HeaderIcon from './HeaderIcon';


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


const Header = () => {

  const [hamburger, setHamburger] = React.useState(false);

  return (
    <>
      <AppBar>
        <Toolbar>

          {/* ハンバーガーメニュー */}
          <HeaderIcon title="a" iconButtonProps={{
              edge: 'start',
              onClick: () => setHamburger(!hamburger),
              sx: {mr: 2},
          }}>
            {hamburger ? <LunchDiningIcon /> : <MenuIcon />}
          </HeaderIcon>

          {/* タイトル */}
          <Typography variant="h6" component="p">
            おひるーれっと
          </Typography>
          
          {/* ボタンメニュー */}
          <Box sx={{position: 'absolute', right: '0.2rem'}}>
            <HeaderIcon title="GitHubを見る" href="https://github.com/Yuji-207/Ohiroulette">
              <GitHubIcon />
            </HeaderIcon>
            <HeaderIcon title="寄付をする" href="https://square.link/u/UHk7emHC">
              <VolunteerActivismIcon />
            </HeaderIcon>
          </Box>
          
        </Toolbar>
      </AppBar>
    </>
  );
}


export default  Header;
