import axios from 'axios';

const itemUrl = 'http://localhost:5000/items';

export const getItems = async ()=>{
    return await axios.get(itemUrl);
}

export const addItems = async (item)=>{
    return await axios.post(`${itemUrl}/add`,item);
}
export const itemInformation = async (id)=>{
    return await axios.get(`${itemUrl}/iteminfo/${id}`);
}