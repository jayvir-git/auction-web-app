import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    itemName: String,
    aboutItem: String,
    owner: String,
    itemCatagory: String,
    auctionDate: Date,
    imageValue: String,
    basePrice: String,
  },
  { timestamps: true }
);

const ItemMessage = mongoose.model('ItemMessage', itemSchema);

export default ItemMessage;