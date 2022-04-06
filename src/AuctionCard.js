import { Box, Tab } from '@mui/material';
import React from 'react';
import Cards from './Component/Cards';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function AuctionCard() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          diaplay: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <TabContext
          value={value}
          style={{
            diaplay: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TabList
            onChange={handleChange}
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab label='ongoing auction' value='1' />
            <Tab label='upcoming auction' value='2' />
          </TabList>
          <TabPanel value='1'>{/* <Cards /> */}</TabPanel>
          <TabPanel value='2'>
            <Cards />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
