const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const adminauthMiddleware = require('../middleware/adminauthMiddleware');

router.post('/', adminauthMiddleware, activityController.createActivity);
router.get('/', activityController.getAllActivities);
router.put('/:id', adminauthMiddleware, activityController.updateActivity);
router.delete('/:id', adminauthMiddleware, activityController.deleteActivity);

module.exports = router;