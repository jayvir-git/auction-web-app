import { Box, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cards from './Component/Cards';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { getItems } from './api/api';

export default function AuctionCard() {
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItem();
  }, []);

  const getAllItem = async () => {
    const itemData = await getItems();
    console.log(itemData.data);
    setItems(itemData.data);
  };

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
          <TabPanel value='1'>
            <Cards items={items.filter((item) => item.isLive)} />
          </TabPanel>
          <TabPanel value='2'>
            <Cards items={items.filter((item) => !item.isLive)} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
