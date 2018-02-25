'use strict'

const express     = require('express');
const router      = express.Router();
const employeeModel = require('../model/employee');

router.post('/employee/add', (request, response, next) => {
    console.log("body", request.body)
    employeeModel.addEmployee(request.body, (err, res) => {
        if (!err) {
            let resObj = {
                code   : 200,
                message: "Added SuccessFully"
            }
            response.send(resObj);
        } else {
            response.send({code: 500, message: "Failed to Add"})
        }
    });
});

router.get('/employee/get_employee/:id', (request, response, next) => {
    employeeModel.getEmployee(request.params, (err, res) => {
        if (!err) {
            res.code    = 200;
            res.message = "Success";
            response.send(res);
        } else {
            response.send({code: 500, message: "Data Not Found"})
        }
    });
});

router.put('/employee/update_employee/:id', (request, response, next) => {
    employeeModel.editEmployee(request, (err, res) => {
        if (!err) {
            let resObj = {
                code   : 200,
                message: "Success"
            }
            response.send(resObj);
        } else {
            response.send({code: 500, message: "Data Not Found"})
        }
    });
});

router.delete('/employee/delete_employee/:id', (request, response, next) => {
    console.log("params", request.params)
    employeeModel.deleteEmployee(request.params, (err, res) => {
        console.log("api", err, res);
        if (!err) {
            let resObj = {
                code   : 200,
                message: "Success"
            }
            response.send(resObj);
        } else {
            response.send({code: 500, message: "Delete Failed"})
        }
    });
});

router.post('/employee/list', (request, response, next) => {
    employeeModel.listEmployee(request.body, (err, res) => {
        if (!err) {
            res.code    = 200;
            res.message = "Success";
            response.send(res);
        } else {
            response.send({code: 500, message: "Data Not Found"})
        }
    });
});

module.exports = router;