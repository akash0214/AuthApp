const express = require('express');
const { signin, signup } = require('../controllers/authentication');
const { auth, isStudent, isAdmin } = require('../middleware/auth');
const userRouter = express.Router();

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);

//Protected routes
userRouter.get('/student', auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected router for Students",
    });
});

userRouter.get('/admin', auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected route for Admin",
    });
});
module.exports = userRouter;