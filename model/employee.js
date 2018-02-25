'use strict'
const async        = require('async');
const _            = require('underscore');
const employeeService = require('../service/employee');
const utils        = require('../service/utils');
const Employee     = {};

Employee.addEmployee = function (request, callback) {
    employeeService.addEmployee(request, (err, res) => {
        if (!err) {
            return callback(null, true);
        }  else {
            return callback(err);
        }
    });
}

Employee.editEmployee = function (request, callback) {
    request.body.id = request.params.id;
    console.log("request.body", request.body);
    employeeService.updateEmployee(request.body, (err, res) => {
        if (!err) {
            return callback(null, true);
        } else {
            return callback(err);
        }
    });
}

Employee.getEmployee = function (request, callback) {
    employeeService.getEmployee(request.id, (err, res) => {
        if (!err) {
            return callback(null, {Employee: res});
        } else {
            return callback(err);
        }
    });
}

Employee.deleteEmployee = function (request, callback) {
    employeeService.deleteEmployee(request.id, (err, res) => {
        if (!err) {
            return callback(null, true);
        }  else {
            return callback(err);
        }
    });
}

Employee.listEmployee = function (request, callback) {
    console.log(JSON.stringify(request));
    let filters = request.filters;
    let search  = request.search;

    let task = [];

    task.push((innerCb) => {
        //on hold will work once the utils issue fixed
        if ((filters && filters.length) || search && search.length) {
            utils.formQuery(request, (err, res) => {
                return innerCb(null, res);
            })
        } else {
            return innerCb(null, {});
        }
    });

    task.push((query, innerCb) => {
        let innerTask = [];

        let req = {
            query: query
        }

        innerTask.push((innerTaskCb) => {
            req.limit = request.size ? request.size : 2;
            req.index = request.index ? request.index : 0
            employeeService.listEmployee(req, (err, res) => {
                if (!err) {
                    return innerTaskCb(null, res);
                } else {
                    return innerTaskCb(err);
                }
            });
        });

        innerTask.push((innerTaskCb) => {
            let req = {
                query: query,
            }
            employeeService.countEmployee(req, (err, res) => {
                if (!err) {
                    return innerTaskCb(null, res);
                } else {
                    return innerTaskCb(err);
                }
            });
        });

        async.parallel(innerTask, (err, res) => {
            res = {
                listEmployee : res[0],
                totalCount: res[1]
            }
            return innerCb(null, res);
        });


    });

    async.waterfall(task, (err, res) => {
        if (!err) {
            return callback(null, res);
        } else {
            return callback(err);
        }
    });
}

module.exports = Employee;