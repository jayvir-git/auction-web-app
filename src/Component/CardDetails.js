import {
  Container,
  Typography,
  Avatar,
  Box,
  IconButton,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  TextField,
  FormGroup,
  FormControl,
} from '@mui/material';
// import carImage from '../Static/images/car.jpg';
import { addItems, updateItems } from '../api/api';
import { makeStyles } from '@mui/styles';
import { purple } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
import CdTimerComp from './countdown/CdTimerComp';
// import { itemInformation } from '../api/api';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function CardDetails({ drawerclose, details }) {
  const item = details;
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const [newPrice, setNewPrice] = useState('');

  const useStyles = makeStyles({
    cardImage: {
      width: 300,
      height: 300,
      background: `url(${item.imageValue})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    },
    contactDetails: {
      marginTop: 20,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: 20,
    },
    textFild: {
      marginBottom: 15,
    },
  });
  const classes = useStyles();

  // const [open, setOpen] = useState(false);
  const [openDig, setOpenDig] = useState(false);
  // const [item , setItem] = useState();

  const handleClickOpen = () => {
    setOpenDig(true);
  };

  const handleClose = () => {
    setOpenDig(false);
  };

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSubmit = async (Item) => {
    console.log('target value', newPrice);
    const res = await updateItems(Item, newPrice);
    history.push('/');
  };
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', padding: 0 }}>
        <IconButton onClick={drawerclose} sx={{}}>
          <CancelIcon
            color='secondary'
            sx={{ display: 'flex', marginRight: 'auto', fontSize: 30 }}
          />
        </IconButton>
      </Box>
      <Box className={classes.cardImage} style={{ borderRadius: 15 }}></Box>
      <Typography
        variant='h4'
        color='secondary'
        marginTop={4}
        style={{ fontWeight: '700' }}
      >
        {item.itemName}
      </Typography>
      <Box className={classes.contactDetails} style={{ display: 'flex' }}>
        <div className={classes.LeftContactDetails}>
          <Avatar
            marginTop={5}
            aria-label=''
            sx={{ bgcolor: purple[500], fontSize: 25, padding: 1 }}
          >
            {item.owner ? item.owner.charAt(0) : 'U'}
          </Avatar>
        </div>
        <Box className={classes.RightContactDetails} marginLeft={2}>
          <Typography className={classes.owner} style={{ fontSize: 15 }}>
            Owner
          </Typography>
          <Typography
            className={classes.ownerName}
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            {item.owner}
          </Typography>
        </Box>
      </Box>
      <Box
        m='auto'
        marginTop={3}
        color='white'
        width={350}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: purple[500],
          borderRadius: 15,
        }}
      >
        {!item.isLive ? (
          <CdTimerComp targetDate={item.auctionDate} />
        ) : (
          <CdTimerComp targetDate={item.endDate} />
        )}
        <Divider orientation='horizontal' flexItem color='white' />
        <Box
          padding={2}
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <Typography marginBottom={2}>Curent Bid</Typography>
          <Typography>5000 Rs.</Typography>
        </Box>
      </Box>
      <Stack spacing={4} direction='row' marginTop={4}>
        <Button variant='outlined' color='secondary'>
          Know More
        </Button>
        {item.isLive && isAuthenticated ? (
          <Button
            variant='contained'
            color='secondary'
            onClick={handleClickOpen}
          >
            Bid Now
          </Button>
        ) : (
          <Button variant='contained' color='secondary' disabled>
            Bid Now
          </Button>
        )}
        <Dialog open={openDig} onClose={handleClose}>
          <DialogTitle>Enter Your Bidding Amount</DialogTitle>
          <Box>
            <FormGroup
              autoComplete='off'
              noValidate
              className={`${classes.root} ${classes.form}`}
            >
              <FormControl>
                <TextField
                  id='outlined-basic'
                  label='Enter the Amount'
                  variant='outlined'
                  color='secondary'
                  className={classes.textFild}
                  onChange={handlePriceChange}
                />
                <Button
                  onClick={() => {
                    handleSubmit(item);
                    handleClose();
                  }}
                  variant='contained'
                  type='submit'
                  color='secondary'
                  fillWidth
                >
                  Submit
                </Button>
              </FormControl>
            </FormGroup>
          </Box>
        </Dialog>
      </Stack>
    </Container>
  );
}
