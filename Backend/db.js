const mongoose = require('mongoose');
const { number } = require('zod');

// Connect to MongoDB with proper error handling
mongoose.connect('mongodb+srv://ritikroshanyadav9696:rascal1234@cluster0.lokbk.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Handle connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  LastName: String,
});

const AccountsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountsSchema);

module.exports = {
  User,
  Account
};