const express = require('express');
const router = express();
router.use(express.Router());

const studentmodel = require("../model/student")
const collegemodel = require('../model/college');

router.get("/", async(req, res) => {
    const studentlist = await studentmodel.find();
    if (studentlist.length === 0) {
        return res.json({ message: "There is no any Student exist!" })
    }

    const jsonOutput = []

    for (var i = 0; i < studentlist.length; i++) {
        const collegelist = await collegemodel.find({ "collegeid": studentlist[i].collegeid })

        jsonOutput.push({
            "Student Name": studentlist[i].name,
            "College Name": collegelist[0].name
        })
    }
    return res.json(jsonOutput);
});

router.post("/", (req, res) => {
    const newstudent = req.body;
    studentmodel.create(newstudent);
    return res.json({ message: "Student added successfully" });
});

router.put("/:name", async(req, res) => {
  
    const name = req.params.name;
    const studentname = req.body.name;

    const studentlist = await studentmodel.find({ "name": name })

    if (studentlist.length < 1) {
        return res.json({ "Message": "Sorry no data found of student name " + name })
    }
    studentmodel.findByIdAndUpdate(studentlist[0]._id, { name: studentname }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
});

router.delete("/:name", async(req, res) => {
    const name = req.params.name;
    
    studentmodel.deleteMany({ "name": name }).then(function() {
        return res.send("Data deleted"); 
    }).catch(function(error) {
        return res.send(error);
    });
});
``

module.exports = router