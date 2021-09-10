const mongoose = require("mongoose");
require("dotenv").config();

const employeeSchema = mongoose.Schema({
  employeeID: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  employeeSurname: { type: String, required: true },
  employeeSalary: { type: Number, required: true },
  managerSurname: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
