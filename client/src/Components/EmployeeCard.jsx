import React from "react";
import { Box } from "@material-ui/core";


export function EmployeeCard({ employee }) {
  return <Box borderColor="darkgray" border={1} borderRadius={5} py={8} px={12} bgcolor="white">
    <p style={{
      margin: 0
    }}>Фамилия сотрудника: {employee.employeeSurname}</p>
    <p>Зарплата сотрудника: {employee.employeeSalary}</p>
    <p>Фамилия менеджера: {employee.managerSurname}</p>
  </Box>;
}
