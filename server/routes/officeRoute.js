const { Router } = require("express");
const employeeController = require("../controllers/employeeController");
const router = new Router();

router.post("/createNewEmployee", employeeController.create);
router.get("/", employeeController.showAllEmployees);
router.post("/updateEmployee", employeeController.updateEmployee);

module.exports = router;
