const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const setDataRoutes = require('./api/routes/setData');

var dbServer = '127.0.0.1:27017';
const dbPort = '27017';
const dbName = 'measurement';

if (!process.env.TEXTSTORE_HOST) {
    console.log('WARNING: the environment variable TEXTSTORE_HOST is not set');
} else {
    dbServer = process.env.TEXTSTORE_HOST + ':' + dbPort;
}

let connection = `mongodb://${dbServer}/${dbName}`
mongoose.connect(connection)
    .then(() => console.log('Connected to database', dbName))
    .catch((err) => {
        console.error('Database connection error', dbName);
        console.error(' trying to connect to server:', connection);
        console.error('Error message is:', err);
        throw new Error('Failed to connect to database.');
    });
//mongoose.connect('mongodb+srv://marcoreinwand:' + process.env.MONGO_ATLAS_PW + '@cluster0.wxsayc9.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requestede-With, Content-Type, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes wich should handle requests
app.use('/set-data', setDataRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;