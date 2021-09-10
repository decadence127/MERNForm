import React from "react"
import { useState, useEffect } from 'react';
import { Grid, Button, Box } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useHttp } from "../hooks/fetchHook";

const theme = createTheme({
  palette:{
    secondary: {
      main: '#a9a9a9',
    },
  },
})



export default function GetEmployeesField(){
  const {loading, error, request} = useHttp()
  const [employees, setEmployees] = useState([])

  useEffect(() => { // fetching employees from db
    async function fetchEmployees(){
    const res = await request('/api/office/', 'GET')
    setEmployees(res)

    }
    fetchEmployees()

}, []);



return(

  <ThemeProvider theme={theme}>
    <Grid container direction="row" style={{margin: 30}}>
      <Grid container  spacing={4}>
        {employees.length && employees.map(employee=>(
          <Grid item  xl={3} lg={3} sm={12} xs={12} >
          <Box borderColor="darkgray" border={1} borderRadius={5} py={8} px={12} bgcolor="white" >
              <p style={{margin: 0}}>Фамилия сотрудника: {employee.employeeSurname}</p>
              <p>Зарплата сотрудника: {employee.employeeSalary}</p>
              <p>Фамилия менеджера: {employee.managerSurname}</p>
          </Box>
          </Grid>
          ))}
        <Grid item xl={3} lg={3} sm={12} xs={12} >
        <Box display="flex"  alignItems="center" justifyContent="center" borderColor="darkgray" border={1} borderRadius={5} p={12.3} bgcolor="white">
        <Button variant="contained" color="primary"size='large' href="/EmployeeCreation">
          Добавить
      </Button>
      </Box>
      </Grid>
    </Grid>
    </Grid>
      
</ThemeProvider>
    )
}
