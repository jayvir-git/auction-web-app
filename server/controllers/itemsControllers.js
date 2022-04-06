import ItemMessage from '../models/itemMessage.js';

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