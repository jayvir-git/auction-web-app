import {
  Container,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControl,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import DateAdapter from '@mui/lab/AdapterMoment';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { addItems } from './api/api';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const initialValues = {
  owner: '',
  itemName: '',
  itemCatagory: '',
  aboutItem: '',
  basePrice: '',
  imageValue: '',
  auctionDate: new Date(),
};

const AddItem = () => {
  const classes = useStyles();
  const history = useHistory();

  const [item, setItem] = useState(initialValues);
  const { itemName, itemCatagory, aboutItem, owner, basePrice, imageValue } =
    item;

  const onValueChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value) => {
    setItem({ ...item, auctionDate: value });
  };

  const handleFileUpload = (e) => {
    setItem({ ...item, imageValue: e.target.files[0] });
  };

  const sendData = async () => {
    const imageData = new FormData();
    console.log(item.imageValue);
    imageData.append('file', item.imageValue);
    imageData.append('upload_preset', 'aitcb4al');
    imageData.append('cloud_name', 'jayvir');
    fetch('https://api.cloudinary.com/v1_1/jayvir/image/upload', {
      method: 'post',
      body: imageData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data.url, typeof data.url);
        const res = await addItems({
          ...item,
          imageValue: data.url,
          endDate: item.auctionDate + 1,
        });
        setItem({ ...item, imageValue: data.url });
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Container sx={{ width: 750 }}>
          <Typography
            variant='h4'
            marginTop={3}
            marginLeft={2}
            marginBottom={4}
            fontWeight={700}
            color='secondary'
          >
            Add Item{' '}
          </Typography>
          <FormGroup>
            <FormControl className={`${classes.root} ${classes.addItemForm}`}>
              <Stack spacing={2}>
                <TextField
                  id='owner'
                  label='Owner'
                  name='owner'
                  value={owner}
                  variant='outlined'
                  multiline
                  color='secondary'
                  required
                  fullWidth
                  onChange={(e) => onValueChange(e)}
                />
                <TextField
                  id='itemNameId'
                  label='Item Name'
                  name='itemName'
                  value={itemName}
                  variant='outlined'
                  color='secondary'
                  required
                  fullWidth
                  onChange={(e) => onValueChange(e)}
                />
                <TextField
                  id='itemCatagoryId'
                  label='Item Catagory'
                  name='itemCatagory'
                  value={itemCatagory}
                  variant='outlined'
                  color='secondary'
                  required
                  fullWidth
                  onChange={(e) => onValueChange(e)}
                />
                <TextField
                  id='aboutItemId'
                  label='About Item'
                  name='aboutItem'
                  value={aboutItem}
                  variant='outlined'
                  multiline
                  rows={2}
                  color='secondary'
                  required
                  fullWidth
                  onChange={(e) => onValueChange(e)}
                />

                <TextField
                  id='basePrice'
                  label='Base price'
                  name='basePrice'
                  value={basePrice}
                  variant='outlined'
                  color='secondary'
                  required
                  fullWidth
                  onChange={(e) => onValueChange(e)}
                />

                <DateTimePicker
                  label='Choose when to go live'
                  inputFormat='MM/DD/YYYY'
                  value={item.auctionDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />

                <label>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    hidden
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <Button variant='outlined' color='secondary' component='span'>
                    Upload Img
                  </Button>
                </label>

                <Button
                  variant='contained'
                  // type='submit'
                  color='secondary'
                  sx={{ width: 250 }}
                  onClick={() => sendData()}
                >
                  Add item
                </Button>
              </Stack>
            </FormControl>
          </FormGroup>
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default withAuthenticationRequired(AddItem);
