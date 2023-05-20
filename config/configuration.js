const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Database connected successfully !!');
        })
        .catch((err) => {
            console.error(err);
            console.log("Couldn't connect to the DB !!");
            process.exit(1);
        })
}