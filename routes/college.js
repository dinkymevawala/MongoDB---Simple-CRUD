const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const collegemodel = require("../model/college")

router.get("/", async(req, res) => {
    const collegelist = await collegemodel.find();
    if (collegelist.length === 0) {
        return res.json({ message: "There is no any College exist!" })
    }
    return res.json({ data: collegelist });
});

router.post("/", (req, res) => {
    const newcollege = req.body;
    collegemodel.create(newcollege);
    return res.json({ message: "College added successfully" });
});

router.put("/:name", async(req, res) => {
  
    const name = req.params.name;
    const collegename = req.body.name;

    const collegelist = await collegemodel.find({ "name": name })

    if (collegelist.length < 1) {
        return res.json({ "Message": "Sorry no data found of college name " + name })
    }
    collegemodel.findByIdAndUpdate(collegelist[0]._id, { name: collegename }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
});

router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    collegemodel.deleteMany({ "name": name }).then(function() {
        return res.send("Data deleted"); 
    }).catch(function(error) {
        return res.send(error); 
    });
});

module.exports = router