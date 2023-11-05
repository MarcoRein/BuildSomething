const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Measurement = require('../models/Measurement');

router.get('/', (req, res, next) => {
    Measurement.find()
        .select('_id timestamp measuredvalue')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        timeStamp: doc.timestamp,
                        value: doc.measuredvalue
                    }
                })
            }
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:timeStamp', (req, res, next) => {
    const timestamp = req.params.timeStamp;
    Measurement.find({ timestamp: timestamp })
        .select('_id timestamp measuredvalue')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        timeStamp: doc.timestamp,
                        value: doc.measuredvalue
                    }
                })
            }
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


module.exports = router;