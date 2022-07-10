import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import schedule from 'node-schedule';
import ItemMessage from './models/itemMessage.js';
import itemRoutes from './routes/items.js';
import nodemailer from 'nodemailer';
import User from './models/user.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amrutiyadhrumil@gmail.com',
    pass: '2782001ads',
  },
});

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
items.map(async (item) => {
  if (item.isLive) {
    console.log('mailing details after auction');
    console.log('item : ', item);
    console.log('owner : ', item.ownerId);
    console.log('bidder : ', item.bidderId);
    const owner = await User.findOne({ userId: item.ownerId });
    const bidder = await User.findOne({ userId: item.bidderId });
    console.log('owner email: ', owner);
    console.log('bidder email: ', bidder);
    schedule.scheduleJob(item.endDate, () => {
      const Owneropt = {
        from: 'amrutiyadhrumil@gmail.com',
        to: owner.email,
        subject: 'congratulations auction complete',
        text: `The details for winner of auction are:
               Name : ${bidder.Name}
               Mobile no. : ${bidder.mobileNo}
               Address : ${bidder.address}
               City : ${bidder.city}
               State : ${bidder.state}
               Country : ${bidder.country}
               `,
      };

      const Bidderopt = {
        from: 'amrutiyadhrumil@gmail.com',
        to: bidder.email,
        subject: 'congratulations auction complete',
        text: `The details of owner of the item are:
               Name : ${owner.Name}
               Mobile no. : ${owner.mobileNo}
               Address : ${owner.address}
               City : ${owner.city}
               State : ${owner.state}
               Country : ${owner.country}
              `,
      };

      transporter.sendMail(Owneropt, (err, res) => {
        if (err) console.log('Error occurred', err.message);
        else console.log('check your email', res);
      });

      transporter.sendMail(Bidderopt, (err, res) => {
        if (err) console.log('Error occurred', err.message);
        else console.log('check your email', res);
      });

      ItemMessage.deleteOne({ _id: item._id })
        .then((res) => console.log('item removed', res))
        .catch((err) => console.log('error occured'));
    });
  } else {
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
  }
});

app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`));
