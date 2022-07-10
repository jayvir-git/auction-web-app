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

export default function App() {
  const useStyles = makeStyles({});
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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
                    Auction Web App
                  </Typography>
                  <Stack direction='row' spacing={2} marginRight={2}>
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
                      <>
                        <Button
                          variant='contained'
                          className={classes.btn}
                          color='secondary'
                          onClick={loginWithRedirect}
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
                      </>
                    )}
                  </Stack>
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
