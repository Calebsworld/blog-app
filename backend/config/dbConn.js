const mongoose = require('mongoose');

const connectDB = () => {
    try {
        const connection = mongoose.connect(process.env.DATABASE_URI);
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;