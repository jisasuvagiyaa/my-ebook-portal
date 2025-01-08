const express = require('express');
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/createBook', auth, bookController.createBook);  
router.get('/getBooks', bookController.getBooks);          
router.get('/:id', bookController.getBookById);   

module.exports = router;
