/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Craete employee Schema */
const employeeSchema = mongoose.Schema({
    employeeid: String,
    name: String,
    departmentid: String
});

const employeeModel = mongoose.model("employee", employeeSchema);

/** Exprote model for use on other file */
module.exports = employeeModel;