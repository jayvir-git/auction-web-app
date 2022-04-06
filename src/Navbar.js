import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  navbar: {
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  navItem: {},
  root: {
    display: 'flex',
  },
  active: {
    background: '#f4f4f4',
  },
});

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'DashBoard',
      icon: <DashboardIcon color='secondary' sx={{ fontSize: 50 }} />,
      path: '/',
    },
    {
      text: 'AddItem',
      icon: <AddCircleOutlineIcon color='secondary' sx={{ fontSize: 50 }} />,
      path: '/AddItem',
    },
    {
      text: 'profile',
      icon: <PersonIcon color='secondary' sx={{ fontSize: 50 }} />,
      path: '/profile',
    },
  ];
  return (
    <>
      <div className={classes.navbar}>
        <List className={classes.navItem}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon fontSize='large'>{item.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}

// export default Navbar;
