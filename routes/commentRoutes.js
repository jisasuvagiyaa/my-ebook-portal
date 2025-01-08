const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/postComment', auth, commentController.postComment);           
router.patch('/:id', auth, commentController.moderateComment); 

module.exports = router;
