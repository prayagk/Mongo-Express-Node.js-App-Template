require('dotenv').config()
const mongoose = require('mongoose');

const database = process.env.DB;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const serverUri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(serverUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log('DB: Atlas DB');
      })
      .catch((err) => {
        console.error('Database connection error');
        console.error(err);
      });
  }
}

module.exports = new Database();
