const Event = require('../model/eventModel')

const createEvent = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(500).json({ message: 'Access denied' })
    }

    const { title, description, date, location } = req.body

    try {
        const event = new Event({ title, description, date, location, createdBy: req.user.id })
        await event.save()
        res.status(200).json(event)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getEventById = async(req, res) =>{
    try {
        const event = await Event.findById(req.params.id)
        res.status(200).json(event)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const bookEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(500).json({ message: 'Event not found' })

        event.attendees.push(req.user.id)
        await event.save()
        res.status(200).json({ message: 'Event Booked Successfully!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createEvent, getEvents, bookEvent, getEventById }