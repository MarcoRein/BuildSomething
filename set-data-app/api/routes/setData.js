const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Measurement = require('../models/Measurement');

router.post('/', (req, res, next) => {
    const measurement = new Measurement({
        _id: new mongoose.Types.ObjectId(),
        timestamp: req.body.timestamp,
        measuredvalue: req.body.value
    });

    measurement
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created measurement successfully',
                createdMeasurement: {
                    _id: result._id,
                    timeStamp: result.timestamp,
                    value: result.measuredvalue
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:timeStamp/:value', (req, res, next) => {
    const timeStamp = req.params.timeStamp;
    const value = req.params.value;

    const measurement = new Measurement({
        _id: new mongoose.Types.ObjectId(),
        timestamp: timeStamp,
        measuredvalue: value
    });

    measurement
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created measurement successfully',
                createdMeasurement: {
                    _id: result._id,
                    timeStamp: result.timestamp,
                    value: result.measuredvalue
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


module.exports = router;