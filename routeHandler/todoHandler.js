const express = require('express');
const router = express.Router();


/**
 * get all todos
 */
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'This is a home route',
    });
});

/**
 * add todos
 */
router.post('/', (req, res) => {

});

/**
 * update todos
 */
router.put('/:id', (req, res) => {

});

/**
 * update todos
 */
router.delete('/:id', (req, res) => {

});

module.exports = router;