import React from "react"
import { useState, useEffect } from 'react';
import { Grid, Button, Box, CircularProgress } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useHttp } from "../hooks/fetchHook";
import EmployeeBox from "./EmployeeBox";
import classes from "./EmployeeBox.module.css"
import UpdateModal from "./UpdateModal";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#a9a9a9',
    },
  },
})



export default function EmployeesGrid({ employees, reload }) {
  const [openModal, setOpenModal] = useState(false);
  const [employee, setEmployee] = useState('');
  return (

    <ThemeProvider theme={theme}>
      <div style={{ padding: '2em' }}>
        <Grid container direction="row" >
          <Grid container spacing={4}>
            <EmployeeBox employees={employees} setEmployee={setEmployee} setOpenModal={setOpenModal} />
            <Grid item xl={3} lg={3} sm={12} xs={12} >
              <Box className={`${classes.employeeBox} ${classes.button}`}>
                <Button sx={{ width: '20px' }} variant="contained" color="primary" href="/EmployeeCreation">
                  Добавить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <UpdateModal open={openModal} setOpen={setOpenModal} employee={employee} reload={reload} />
      </div>
    </ThemeProvider>
  )
}
