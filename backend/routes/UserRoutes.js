const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

// GET endpoint to fetch all users
router.get('/', userController.getAllUsers);

// POST endpoint to add a new user
router.post('/', userController.addUser);

// POST endpoint for user login
router.post('/login', userController.loginUser);
// Backend route to delete user

router.get('/:userId', userController.getUserById);

// Route to update user data
router.put('/:userId', userController.updateUser);
module.exports = router;
