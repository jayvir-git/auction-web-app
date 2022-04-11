import {
  Card,
  CardMedia,
  IconButton,
  Avatar,
  CardHeader,
  Drawer,
  Box,
  Grid,
  Container,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { purple } from '@mui/material/colors';
// import carImage from '../Static/images/car.jpg';
import CardDetails from './CardDetails';
import { getItems } from '../api/api';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

export default function Cards({ items }) {
  const [drawerState, setDrawerState] = useState(false);
  // const [items, setItems] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);

  const DrawerOpen = () => (event) => {
    setDrawerState(!drawerState);
  };

  // useEffect(() => {
  //   getAllItem();
  // }, []);

  // const getAllItem = async () => {
  //   const itemData = await getItems();
  //   console.log(itemData.data);
  //   setItems(itemData.data);
  // };

  const handleClick = (item) => {
    setItemDetails(item);
    setDrawerState(true);
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={1}>
          {items.map((item) => (
            <Grid item md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  height='194'
                  image={item.imageValue}
                  alt='Car Images'
                  onClick={() => handleClick(item)}
                />
                <CardHeader
                  avatar={
                    <Avatar aria-label='recipe' sx={{ bgcolor: purple[500] }}>
                      {item.owner.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label='settings'>
                      <GradeOutlinedIcon />
                    </IconButton>
                  }
                  title={item.itemName}
                  subheader={item.owner}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {itemDetails && (
        <Drawer anchor='right' open={drawerState}>
          <Box sx={{ width: 500 }} role='presentation' onClick={DrawerOpen}>
            <CardDetails
              details={itemDetails}
              drawerclose={() => setDrawerState(false)}
            />
          </Box>
        </Drawer>
      )}
    </>
  );
}
