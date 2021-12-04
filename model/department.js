/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Craete Department Schema */
const departmentSchema = mongoose.Schema({
    departmentid: String,
    name: String
});

const departmentModel = mongoose.model("department", departmentSchema);

/** Exprote model for use on other file */
module.exports = departmentModel;