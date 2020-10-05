/* eslint-disable comma-dangle */
const express = require('express');
const logger = require('morgan');
const session = require('express-session');

require('./src/db/db');

const Router = require('./routes/index');

const app = express();
app.set('trust proxy', 1);

console.log(`Node enviornment: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'production') {
  const redis = require('redis');
  const redisClient = redis.createClient();
  const redisStore = require('connect-redis')(session);

  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });
  
  app.use(session({
    secret: 'secret',
    name: 'my-app',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: 'none',
      maxAge: 12 * 60 * 60 * 1000,  //12 hrs
      httpOnly: true
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
  }));

  console.log('Session: Redis session');
} else if (process.env.NODE_ENV === 'development') {
  app.use(session({
    secret: 'secret',
    cookie: { 
      maxAge: 12 * 60 * 60 * 1000,
      sameSite: false
    },
    saveUninitialized: false,
    resave: false
  }));
  
  console.log('Session: Express session');
}

app.use(logger('dev'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.use('/', Router);

module.exports = app;
