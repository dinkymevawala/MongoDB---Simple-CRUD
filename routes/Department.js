const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const departmentModel = require("../model/department")

router.get("/", async(req, res) => {
    const departmentList = await departmentModel.find();
    if (departmentList.length === 0) {
        return res.json({ message: "There is no any department exist!" })
    }
    return res.json({ data: departmentList });
});

router.post("/", (req, res) => {
    const newDepratment = req.body;
    departmentModel.create(newDepratment);
    return res.json({ message: "Department added successfully" });
});

router.put("/:name", async(req, res) => {
  
    const name = req.params.name;
    const departmentName = req.body.name;

    const departmentList = await departmentModel.find({ "name": name })

    if (departmentList.length < 1) {
        return res.json({ "Message": "Sorry no data found of department name " + name })
    }
    departmentModel.findByIdAndUpdate(departmentList[0]._id, { name: departmentName }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
});

router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    departmentModel.deleteMany({ "name": name }).then(function() {
        return res.send("Data deleted"); 
    }).catch(function(error) {
        return res.send(error); 
    });
});

module.exports = router