const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/dbConnection')
const authRoute = require('./routes/authRoutes')
const eventRoute = require('./routes/eventRoutes')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/events', eventRoute)

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`)
})