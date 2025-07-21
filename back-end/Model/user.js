const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters'],
// match: [/^(?=.*\d).{6,}$/, 'Password must contain a number']
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
