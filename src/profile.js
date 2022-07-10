import {
  Container,
  Typography,
  FormControl,
  FormGroup,
  IconButton,
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { addUser } from './api/api';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const Input = styled('input')({
  display: 'none',
});

const useStyles = makeStyles({
  formProfile: {
    '&>*': {
      color: 'secondary',
    },
  },
});

const Profile = () => {
  const { user } = useAuth0();
  const classes = useStyles();
  const history = useHistory();

  const initialValues = {
    Name: '',
    mobileNo: '',
    address: '',
    city: '',
    state: '',
    country: '',
  };

  const [userDetails, setUserDetails] = useState(initialValues);
  const [userId, setUserId] = useState({});
  const { Name, mobileNo, address, city, state, country } = userDetails;

  const onValueChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const sendData = async () => {
    const res = await addUser({ ...userDetails, ...userId });
    history.push('/');
  };

  // setting user id
  useEffect(() => {
    setUserId({ userId: user.sub, email: user.email });
  }, []);

  return (
    <Container className={classes.mainProfile}>
      <Typography
        variant='h4'
        marginTop={3}
        marginBottom={4}
        fontWeight={700}
        color='secondary'
        align='center'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: '380px',
        }}
      >
        <EditIcon fontSize='large' />
        Edit Profile
      </Typography>
      <FormGroup fullWidth>
        <Grid container>
          <Grid item xs={4}>
            <FormControl>
              <label htmlFor='contained-button-file'>
                <Input
                  accept='image/*'
                  id='contained-button-file'
                  multiple
                  type='file'
                  //   onChange={handleOnChange}
                />
                <IconButton
                  color='secondary'
                  aria-label='upload picture'
                  component='span'
                  //   onClick={handleOnClick}
                >
                  <Avatar
                    component='span'
                    src={user.picture}
                    style={{
                      margin: '5px',
                      width: '250px',
                      height: '250px',
                    }}
                  />
                </IconButton>
              </label>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <Stack spacing={2} className={classes.formProfile}>
                <TextField
                  id='standard-basic'
                  color='secondary'
                  label='Name'
                  name='Name'
                  variant='outlined'
                  fullWidth
                  value={Name}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
                <TextField
                  id='standard-basic'
                  color='secondary'
                  label='mobile No.'
                  name='mobileNo'
                  variant='outlined'
                  fullWidth
                  value={mobileNo}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
                <TextField
                  id='standard-basic'
                  color='secondary'
                  label='address'
                  name='address'
                  variant='outlined'
                  multiline
                  rows={2}
                  fullWidth
                  value={address}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
                <TextField
                  id='standard-basic'
                  color='secondary'
                  label='city'
                  name='city'
                  variant='outlined'
                  fullWidth
                  value={city}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
                <TextField
                  id='standard-basic'
                  color='secondary'
                  label='state'
                  name='state'
                  variant='outlined'
                  fullWidth
                  value={state}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />
                <TextField
                  id='standard-basic'
                  color='secondary'
                  label='country'
                  name='country'
                  variant='outlined'
                  fullWidth
                  value={country}
                  onChange={(e) => {
                    onValueChange(e);
                  }}
                />

                <Button
                  variant='contained'
                  color='secondary'
                  sx={{ width: 250 }}
                  onClick={() => sendData()}
                >
                  Save details
                </Button>
              </Stack>
            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>
      {/* <Typography>{user}</Typography> */}
    </Container>
  );
};

export default withAuthenticationRequired(Profile);
