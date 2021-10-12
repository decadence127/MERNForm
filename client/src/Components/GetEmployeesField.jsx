import { EmployeeCard } from './EmployeeCard';
import React from "react"
import { useState, useEffect } from 'react';
import { Grid, Button, Box, Paper } from "@material-ui/core";
import { useHttp } from "../hooks/fetchHook";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
}));

export default function GetEmployeesField() {
  const styles = useStyles();
  const { loading, error, request } = useHttp()
  const [employees, setEmployees] = useState([])

  useEffect(() => { // fetching employees from db
    async function fetchEmployees() {
      const res = await request('/api/office/', 'GET')
      setEmployees(res)

    }
    fetchEmployees()

  }, []);



  return (
    <div className={styles.root}>
      {loading && <LoadingSpinner />}
      <Grid container direction="row">
        <Grid container spacing={3}>
          {employees.length && employees.map(employee => (
            <Grid item xl={3} lg={3} sm={12} xs={12} >
              <EmployeeCard employee={employee} />
            </Grid>
          ))}
          <Grid item xl={3} lg={3} sm={12} xs={12} >
            <Box display="flex" alignItems="center" justifyContent="center" borderColor="darkgray" border={1} borderRadius={5} py={8} px={12} bgcolor="white">
              <Button variant="contained" color="primary" size='large' href="/EmployeeCreation">
                Добавить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
