import axios from 'axios';

const itemUrl = 'http://localhost:5000/items';

export const getItems = async () => {
  return await axios.get(itemUrl);
};

export const addItems = async (item) => {
  return await axios.post(`${itemUrl}/add`, item);
};

export const itemInformation = async (id) => {
  return await axios.get(`${itemUrl}/iteminfo/${id}`);
};

export const updateItems = async (item, newPrice, bidderId) => {
  return await axios.post(`${itemUrl}/updateItems`, {
    item,
    newPrice,
    bidderId,
  });
};

export const bkmItem = async (id, userId) => {
  return await axios.post(`${itemUrl}/bkmItem`, { id, userId });
};

export const addUser = async (user) => {
  return await axios.post(`${itemUrl}/addUser`, user);
};
