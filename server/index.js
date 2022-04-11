import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import schedule from 'node-schedule';
import ItemMessage from './models/itemMessage.js';

import itemRoutes from './routes/items.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/items', itemRoutes);

const CONNECTION_URL =
  'mongodb+srv://dhrumil2782001:EDsndKMOtB6hVKYe@cluster0.nakj1.mongodb.net/auctionWebApp?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoObj = mongoose.connection;

mongoObj.on('connected', () => {
  console.log('Mongodb connected');
});
mongoObj.on('error', () => {
  console.log('error connecting mongodb');
});

const items = await ItemMessage.find();
console.log(items);
items.map((item) => {
  schedule.scheduleJob(item.auctionDate, () => {
    console.log('updating...');
    ItemMessage.updateOne(
      { itemName: item.itemName },
      { isLive: true },
      (res, err) => {
        if (err) console.log(err);
        else console.log('updated', res);
      }
    );
  });
});

app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`));
