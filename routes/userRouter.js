const express = require('express');
const { signin, signup } = require('../controllers/auth');
const userRouter = express.Router();

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);

module.exports = userRouter;