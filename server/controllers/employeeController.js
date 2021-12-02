const Employee = require("../entities/entities");

class EmployeeController {
  async updateEmployee(req, res) {
    try {
      if (req.body === undefined || !req.body || req.body.id === null) {
        return res.status(404).json({ message: "Id is empty!" });
      }
      if (
        req.body.employeeSurname === null &&
        req.body.employeeSalary === null &&
        req.body.managerSurname === null
      ) {
        return res.status(404).json({ message: "Request body is empty!" });
      }
      console.log("Value: ", req.body);
      const { id, employeeSurname, employeeSalary, managerSurname } = req.body;

      const response = await Employee.updateOne(
        { _id: id },
        { employeeSurname, employeeSalary, managerSurname },
        { upsert: true }
      );
      return res
        .status(200)
        .json(response.acknowledged && { message: "Updated successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message || "Internal error" });
    }
  }
  async create(req, res) {
    try {
      const { employeeSurname, employeeSalary, managerSurname } = req.body;
      const candidateEmployee = await Employee.findOne({
        employeeSurname,
        managerSurname,
      });
      if (candidateEmployee) {
        return res
          .status(400)
          .json({ message: "This employee is already exists in database." });
      }
      const employee = new Employee({
        employeeSurname,
        employeeSalary,
        managerSurname,
      });

      await employee.save(function (err, employee) {
        if (err) return console.error(err);
        console.log(employee);
      });
      console.log("Employee", employee);
      return res.status(201).json({ message: "New employee has been saved." });
    } catch (e) {
      res.status(500).json({ message: "Internal Error. Try again." });
    }
  }
  async showAllEmployees(req, res) {
    try {
      const allEmployees = await Employee.find({});
      console.log(allEmployees);
      return res.json(allEmployees);
    } catch (e) {
      res.status(500).json({ message: "Cannot process get method" });
    }
  }
}
module.exports = new EmployeeController();
