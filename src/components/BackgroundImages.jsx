import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const BackgroundImages = () => {
  return (
    <Box sx={{display: 'fixed', width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'public/imgs/hamburger_steak.jpeg',
    title: 'hamburger_steak',
  },
  {
    img: 'public/imgs/katsu.jpeg',
    title: 'katsu',
  },
  {
    img: 'public/imgs/lunch.jpeg',
    title: 'lunch',
  },
  {
    img: 'public/imgs/pancake.jpeg',
    title: 'pancake',
  },
  {
    img: 'public/imgs/pizza.jpeg',
    title: 'pizza',
  },
  {
    img: 'public/imgs/salad.jpeg',
    title: 'salad',
  },
  {
    img: 'public/imgs/soba.jpeg',
    title: 'soba',
  },
  {
    img: 'public/imgs/sushi.jpeg',
    title: 'sushi',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
];


export default BackgroundImages;
