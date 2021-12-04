const express = require('express');
const router = express();
router.use(express.Router());

const employeeModel = require("../model/employee")
const departmentModel = require('../model/department');

router.get("/", async(req, res) => {
    const employeeList = await employeeModel.find();
    if (employeeList.length === 0) {
        return res.json({ message: "There is no any employee exist!" })
    }

    const jsonOutput = []

    for (var i = 0; i < employeeList.length; i++) {
        const departmentList = await departmentModel.find({ "departmentid": employeeList[i].departmentid })

        jsonOutput.push({
            "Employee Name": employeeList[i].name,
            "Department Name": departmentList[0].name
        })
    }
    return res.json(jsonOutput);
});

router.post("/", (req, res) => {
    const newEmployee = req.body;
    employeeModel.create(newEmployee);
    return res.json({ message: "Employee added successfully" });
});

router.put("/:name", async(req, res) => {
  
    const name = req.params.name;
    const employeeName = req.body.name;

    const employeeList = await employeeModel.find({ "name": name })

    if (employeeList.length < 1) {
        return res.json({ "Message": "Sorry no data found of employee name " + name })
    }
    employeeModel.findByIdAndUpdate(employeeList[0]._id, { name: employeeName }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
});

router.delete("/:name", async(req, res) => {
    const name = req.params.name;
    
    employeeModel.deleteMany({ "name": name }).then(function() {
        return res.send("Data deleted"); 
    }).catch(function(error) {
        return res.send(error);
    });
});
``

module.exports = router