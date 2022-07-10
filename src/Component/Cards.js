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
import React, { useState } from 'react';
import { purple } from '@mui/material/colors';
import CardDetails from './CardDetails';
import { bkmItem } from '../api/api';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

export default function Cards({ items }) {
  const [drawerState, setDrawerState] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [up, setUp] = useState(false);
  const { user, loginWithRedirect } = useAuth0();
  const history = useHistory();

  const DrawerOpen = () => (event) => {
    setDrawerState(!drawerState);
  };

  const handleClick = (item) => {
    setItemDetails(item);
    setDrawerState(true);
  };

  const bookmark = (id) => {
    console.log('bookmark method called with ', id);
    bkmItem(id, user.sub)
      .then((res) => setUp(true))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container spacing={1}>
          {items.map((item) => (
            <Grid item md={4} sm={6} xs={12} key={item.itemName}>
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
                      {user && item.bkm.includes(user.sub) ? (
                        <GradeIcon />
                      ) : (
                        <GradeOutlinedIcon
                          onClick={() => {
                            console.log('bookmark clicked', item);
                            if (user) {
                              bookmark(item._id);
                            } else loginWithRedirect();
                          }}
                        />
                      )}
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
