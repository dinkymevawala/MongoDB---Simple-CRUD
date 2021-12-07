const mongoose = require('mongoose');

const studentschema = mongoose.Schema({
    studid: String,
    name: String,
    collegeid: String
});

const studmodel = mongoose.model("student", studentschema);

module.exports = studmodel;