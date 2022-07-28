const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../schema/todoSchema');
const checkLogin = require('../middlewares/checkLogin');
/**
 * create todo model
 */
const Todo = new mongoose.model("Todo", todoSchema);

/**
 * get all todos
 */
router.get('/', checkLogin, (req, res) => {
    Todo.find().select({
        _id: 0,
        __v: 0,
        date: 0
    })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error"
                });
            } else {
                res.status(200).json({
                    data
                });
            }
        });
});

/**
 * add todo
 */
router.post('/', async (req, res) => {
    const newTodo = Todo(req.body);
    try {
        await newTodo.save();
        res.status(200).json({
            message: "Todo inserted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a error in server side"
        });
    }
});

/**
 * update todos
 */
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            ...req.body
        }
    }, {
        useFindAndModify: false,
        new: true,
    }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        } else {
            res.status(200).json({
                message: "Todo was updated successfully!"
            })
        }
    });
});

/**
 * update todos
 */
router.delete('/:id', (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        } else {
            res.status(200).json({
                message: "Todo was deleted successfully!"
            })
        }
    });
});

module.exports = router;