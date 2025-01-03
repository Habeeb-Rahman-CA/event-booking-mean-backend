const express = require('express')
const { createEvent, bookEvent, getEvents, getEventById, cancelEvent } = require('../controller/eventController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, createEvent).get(getEvents)
router.route('/:id').get(getEventById).delete(protect, cancelEvent)
router.route('/:id/book').post(protect, bookEvent)

module.exports = router