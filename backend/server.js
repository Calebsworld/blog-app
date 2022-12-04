require('dotenv').config();

const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');

const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//Global Middleware

const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

app.use(logger);
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

//Session Middleware

const sessionStore = new MongoDBStore({
    uri: process.env.Database_URI,
    collection: 'sessions'
  });

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        domain: 'localhost',
    }
}))

//Routes

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

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

app.use(errorHandler);

//Events

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})

sessionStore.on('error', err => {
    console.log(er);
  });

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
})



