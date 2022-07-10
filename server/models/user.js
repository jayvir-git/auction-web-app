import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    Name: String,
    mobileNo: String,
    address: String,
    city: String,
    state: String,
    country: String,
    userId: {
      type: String,
      default: 'ns',
    },
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
