const mongoose = require('mongoose');

const collegeschema = mongoose.Schema({
    collegeid: String,
    name: String
});

const collegemodel = mongoose.model("college", collegeschema);

module.exports = collegemodel;