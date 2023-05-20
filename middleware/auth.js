const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        //Extract token
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing !!",
            });
        }
        //Verify token
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            console.log(payload); // Just to see what decode carries
            req.user = payload; //Storing the payload in req.user
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "Invalid token !!",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token !!",
        })
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role != "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students !!",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong !!",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong !!",
        });
    }
};