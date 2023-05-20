const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists !!",
            });
        }
        //Now encrypting the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
                message: "Couldn't hash the password !!",
            })
        }
        //Creating the new user and adding the entry into the database 
        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        });
        //Success message
        return res.status(200).json({
            success: true,
            message: "User created successfully !!",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Couldn't create new user, Please try again later !!",
        })
    }
};

exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Please enter all the fields",
                success: false,
            });
        }
        let user = await userModel.findOne({email});
        if(!user){
            res.status(401).json({
                success: false,
                message: "User not registered !!",
            });
        }
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        //Verify password and create the JWT token
        if(await bcrypt.compare(password, user.password)){
            let token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: '1d',
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                user: user,
                token: token,
                success: true,
                message: "User LogIn successfull !!",
            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Please enter correct password !!",
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "LogIn failure !!",
        })
    }
}