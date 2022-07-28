const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../schema/userSchema');
const User = new mongoose.model('User', userSchema);

router.post('/signup', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword
        });

        await newUser.save();

        res.status(200).json({
            message: "Signup was successfully!"
        });
    } catch (error) {
        res.send(500).json({
            error: error
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                /**
                 * generate login token
                 */
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_TOKEN, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    accessToken: token,
                    message: "Login successful!"
                });
            } else {
                res.status(401).json({
                    error: "Authentication error"
                })
            }
        } else {
            res.status(401).json({
                error: "Authentication error"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

module.exports = router;