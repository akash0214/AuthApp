const express = require('express');
const { connect } = require('./config/configuration');
const userRouter = require('./routes/userRouter');
const app = express();
require('dotenv').config();

app.use(express.json());

connect();

app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
