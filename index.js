const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

/**
 * configure app
 */
const app = express();
dotEnv.config();
app.use(express.json());

/**
 * connect with mongoose
 */
mongoose.connect('mongodb://localhost/node-crud')
    .then(() => console.log('Connection successful!'))
    .catch(err => console.log(err));

/**
 * todo handler
 */
app.use('/todo', todoHandler);

/**
 * user handler
 */
app.use('/user', userHandler)


/**
 * error middleware
 */
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        error: err
    });
};

app.use(errorHandler);


/**
 * listen node server
 */
app.listen(3000, () => {
    console.log(`Listening at port 3000`);
})