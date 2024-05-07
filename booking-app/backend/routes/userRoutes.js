const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminauthMiddleware = require('../middleware/adminauthMiddleware');

// Register a new user
router.post('/register', userController.createUser);

// Login user
router.post('/login', userController.loginUser);

// Create an admin user - Use with caution
router.post('/create-admin', userController.createAdmin);

// Get all users (Admin only)
router.get('/', adminauthMiddleware, userController.getAllUsers);

// Search user by name (Admin Only)
router.get('/search', adminauthMiddleware, userController.searchUserByName);

// Update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Update user information (Admin Only)
router.put('/:id', adminauthMiddleware, userController.updateUser);

// Delete user by ID (Admin Only)
router.delete('/:id', adminauthMiddleware, userController.deleteUser);

router.post('/updatePassword', authMiddleware, userController.updateUserPassword);

module.exports = router;