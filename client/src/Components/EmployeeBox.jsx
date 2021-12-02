import React, { useEffect } from 'react';
import { Grid, Box, Typography } from "@material-ui/core";
import classes from "./EmployeeBox.module.css"
const EmployeeBox = ({ employees, setEmployee, setOpenModal }) => {
  const clickHandler = (e) => {
    setEmployee(e.currentTarget.id);
    setOpenModal(true)
  }
  return (
    <>
      {employees.length && employees.map(employee => (
        <Grid item xl={3} lg={3} sm={12} xs={12} key={employee._id} >
          <Box key={employee._id} id={employee._id} className={classes.employeeBox} onClick={clickHandler} >
            <Typography className={classes.employeeData}> Фамилия сотрудника: {employee.employeeSurname}</Typography>
            <Typography className={classes.employeeData}> Зарплата сотрудника: {employee.employeeSalary}</Typography>
            <Typography className={classes.employeeData}> Фамилия менеджера: {employee.managerSurname}</Typography>
          </Box>
        </Grid>
      ))
      }
    </>
  );
};

export default EmployeeBox;