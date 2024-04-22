const mongoose = require('mongoose');

const connectDB = () => {
    const connectString = 'mongodb+srv://alexmichael63:hGRQ6fxjn7xzx5xd@zone.xzktscp.mongodb.net/';
    mongoose.connect(connectString);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
};

module.exports = connectDB;