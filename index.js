require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const port = process.env.PORT || 5432;

app.use(express.json());
app.use(express.Router());

app.get('/', (req, res) => res.send('<h1 style="text-align:center">Welcome to Employee Registration Portal</h1>'));

const departmentRoutes = require('./routes/Department');
app.use('/department', departmentRoutes);

const employeeRoutes = require('./routes/Employee');
app.use('/employee', employeeRoutes);

mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("MongoDB connected successfully"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));