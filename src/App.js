import React from 'react';
import { Typography, Box, Button, Stack, Grid } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AuctionCard from './AuctionCard';
import Profile from './profile';
import AddItem from './AddItem';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { makeStyles } from '@mui/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { sizing } from '@mui/system';

export default function App() {
  const useStyles = makeStyles({});
  const classes = useStyles();
  const { loginWithPopup, isAuthenticated, logout } = useAuth0();

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Router>
        <Box sx={{ width: '100vw', height: '100vh' }}>
          <Grid container spacing={1}>
            <Grid item xs={1} sx={{ height: '100vh' }}>
              <Navbar />
            </Grid>
            <Grid item xs={11}>
              <Box>
                <Box
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant='h4'
                    color='secondary'
                    style={{ fontWeight: 600, fontSize: 40 }}
                  >
                    Online Auction
                  </Typography>
                  {isAuthenticated ? (
                    <Button
                      variant='outlined'
                      className={classes.btn}
                      color='secondary'
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Stack direction='row' spacing={2} marginRight={2}>
                      <Button
                        variant='contained'
                        className={classes.btn}
                        color='secondary'
                        onClick={loginWithPopup}
                      >
                        Login
                      </Button>
                      <Button
                        variant='outlined'
                        className={classes.btn}
                        color='secondary'
                      >
                        Sign up
                      </Button>
                    </Stack>
                  )}
                </Box>
                <Switch>
                  <Route exact path='/'>
                    <AuctionCard />
                  </Route>
                  <Route path='/profile'>
                    <Profile />
                  </Route>
                  <Route path='/AddItem'>
                    <AddItem />
                  </Route>
                </Switch>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Router>
    </LocalizationProvider>
  );
}
