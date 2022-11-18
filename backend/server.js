require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const multer = require('multer')

const path = require('path');

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');

//===========================================================================================================

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(express.json());

app.use(cors({
    origin: '*'
}))

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

//===========================================================================================================
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api', blogRoutes);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'});
    } else {
        res.type('text').send('404 Not Found');
    }
});

// app.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//       res.statusCode = 400;
//       res.send(err.code);
//     } else if (err) {
//       if (err.message === "FILE_MISSING") {
//         res.statusCode = 400;
//         res.send("FILE_MISSING");
//       }
//     }
//   });

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
})



