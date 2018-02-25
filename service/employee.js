'use strict'

const mongo       = require('mongodb');
const MongoClient = mongo.MongoClient;

const app   = require('../config/app');
const employee = {};

employee.addEmployee = function (request, callback) {
    MongoClient.connect(app.mongo.url, (err, db) => {
        if (!err) {
            let collections = db.collection('user');
            collections.insert(request, (err, res) => {
                return callback(null, true);
            });
        } else {
            return callback('Adding Data Failed');
        }
        db.close();
    });
}

employee.getEmployee = function (request, callback) {
    MongoClient.connect(app.mongo.url, (err, db) => {
        if (!err) {
            let collections = db.collection('user');
            let id          = new mongo.ObjectID(request);
            collections.findOne({'_id': id}, (err, res) => {
                if (!err && res) {
                    return callback(null, res)
                } else {
                    if (!err) {
                        err = 'DATA NOT FOUND';
                    }
                    return callback(err);
                }
            });
        } else {
            return callback(err);
        }
        db.close();
    });
}

employee.updateEmployee = function (request, callback) {
    MongoClient.connect(app.mongo.url, (err, db) => {
        if (!err) {
            let collections = db.collection('user');
            let id          = new mongo.ObjectID(request.id);
            collections.update({'_id': id}, request, (err, res) => {
                if (!err) {
                    return callback()
                } else {
                    if (!err) {
                        err = 'DATA NOT FOUND';
                    }
                    return callback(err);
                }
            });
        } else {
            return callback(err);
        }
        db.close();
    });
}

employee.listEmployee = function (request, callback) {
    // let query = request.query;
    MongoClient.connect(app.mongo.url, (err, db) => {
        if (!err) {
            let collections = db.collection('user');
            collections.find(request.query).skip(request.index).limit(request.limit).sort({'name.firstName': 1}).toArray((err, res) => {
                return callback(null, res);
            });
        } else {
            return callback();
        }
        db.close();
    });
}

employee.countEmployee = function (request, callback) {
    // let query = request.query;
    MongoClient.connect(app.mongo.url, (err, db) => {
        if (!err) {
            let collections = db.collection('user');
            collections.find(request.query).count((err, res) => {
                return callback(null, res);
            });
        } else {
            return callback();
        }
        db.close();
    });
}

employee.deleteEmployee = function (request, callback) {
    MongoClient.connect(app.mongo.url, (err, db) => {
        if (!err) {
            let collections = db.collection('user');
            let id          = new mongo.ObjectID(request);
            collections.deleteOne({_id: id}, (err, res) => {
                if (!err) {
                    return callback(null, res);
                } else {
                    return callback('Delete Failed');
                }
            })
        } else {
            return callback(err);
        }
        db.close();
    });
}

module.exports = employee;
