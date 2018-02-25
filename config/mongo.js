'use strict'

const MongoClient = require('mongodb').MongoClient;
const app         = require('./app');

let mongo = {};

MongoClient.connect(app.mongo.url, (err, db) => {
    if (!err) {
        console.log("MongoDB connected");
    } else {
        console.log('Mongo DB Connection Failed');
    }
    db.close();
});

module.exports = mongo;