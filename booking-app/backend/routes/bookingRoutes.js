const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const adminauthMiddleware = require('../middleware/adminauthMiddleware');

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/user', authMiddleware, bookingController.getUserBookings);
router.get('/all', authMiddleware, adminauthMiddleware, bookingController.getAllBookingsWithUsernames);
router.delete('/:id', authMiddleware, bookingController.deleteBooking);
router.put('/:id', authMiddleware, bookingController.updateBooking);
router.delete('/admin/:id', authMiddleware, adminauthMiddleware, bookingController.adminDeleteBooking);

module.exports = router;