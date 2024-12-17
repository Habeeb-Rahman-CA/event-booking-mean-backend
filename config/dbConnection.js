const mongoose = require('mongoose');

const connectDB = async() =>{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Database is connected: ', connect.connection.host, connect.connection.name)
}

module.exports = connectDB