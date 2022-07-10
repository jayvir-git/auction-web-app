import ItemMessage from '../models/itemMessage.js';
import User from '../models/user.js';

export const getItems = async (req, res) => {
  try {
    const itemMessage = await ItemMessage.find();

    res.status(200).json(itemMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addItem = async (req, res) => {
  const item = req.body;

  const newItem = new ItemMessage(item);
  try {
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateItems = async (req, res) => {
  const { item, newPrice, bidderId } = req.body;
  console.log('update request', req.body);
  ItemMessage.updateOne(
    { itemName: item.itemName },
    { basePrice: newPrice, bidderId: bidderId },
    (res, err) => {
      if (err) console.log(err);
      // else {
      res.json(res);
      console.log('updated', res);
      // }
    }
  );
};

export const addUser = async (req, res) => {
  const user = req.body;
  const newUser = User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log('error while saving user', error);
    res.status(409).json({ message: error.message });
  }
};

export const bkmItem = async (req, res) => {
  const { id, userId } = req.body;
  ItemMessage.updateOne({ _id: id }, { $push: { bkm: userId } }, (res, err) => {
    if (err) console.log(err);
    else {
      res.status(201).json(res);
      console.log('item bookmarked', res);
    }
  });
};
