'use strict';
const express = require('express');
const path = require('path');
const app = express();
const process = require('node:process');
const env = require('./config/env.js');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./route/auth.route.js');
const cors = require('cors');
const FoodRouter = require('./route/food.route.js');
// const dirname = path.resolve('');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/auth', AuthRoutes);
app.use('/food', FoodRouter);

app.get('/', async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server Started Successfully',
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

async function server() {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server started at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
server();
