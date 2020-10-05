const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String
  }
);

const users = mongoose.model('users', userSchema);

exports.users = users;
