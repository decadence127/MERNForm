import React from "react";
import { Grid,TextField, Button, Typography, Box } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useHttp} from '../hooks/fetchHook';

const useStyles = makeStyles((theme) => ({
  // textField: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //     width: '25ch',
  //   }},                             crap styles
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}))
//   },
//   box:{
//     border: 1,
//     borderRadius: 3,
//   },
// }));
const theme = createTheme({
  palette:{
    secondary: {
      main: '#a9a9a9',
    },
  },
})

export default function FormPropsTextFields() { //Prompt form
  const classes = useStyles();
  const {loading, error, request} = useHttp()
  const [formValue, setFormValue] = useState({
    employeeSurname: '',
    employeeSalary: '',
    managerSurname: ''
  })
  useEffect(()=>{

  }, [error])// error handler still working on it

  const changeHandler = (e) =>{
    setFormValue({...formValue, [e.target.name]: e.target.value })
  }

    const regHandler= async () =>{
      try{
        const data = await request('/api/office/createNewEmployee', 'POST', {...formValue})
        console.log("Data", data)
        alert(data.message)
      }
      catch(e){
        console.error(e.message)
        alert(e.message)
      }
    }
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" direction="column" spacing={4}>
        <Grid item style={{marginTop: "40px"}}>
          <Typography variant="h6" color="primary">
            Добавить нового сотрудника
          </Typography>
        </Grid>
          <Box borderColor="darkgray" border={1} borderRadius={5} py={8} px={12} bgcolor="white" >
          <Grid item>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <TextField onChange={changeHandler} name="employeeSurname" required id="standard-required" label="Фамилия сотрудника" fullWidth style={{marginBottom: "2em"}}/>
              <TextField type="number" onChange={changeHandler} name="employeeSalary" required id="standard-required" label="Зарплата сотрудника"fullWidth style={{marginBottom: "2em"}}/>
              <TextField onChange={changeHandler} name="managerSurname" required id="standard-required" label="Фамилия менеджера" fullWidth style={{marginBottom: "2em"}}/>
              <div className={classes.root}>
              <Button disabled={loading} onClick={regHandler} size='large' variant="contained" color="primary" >
                Добавить
              </Button>
              <Button variant="contained" color="secondary"size='large' href="/">
                Вернуться
              </Button>
              </div>
              <Grid item style={{marginTop: "10px"}}>
                <Typography color="secondary" variant="caption">* - необходимо заполнить</Typography>
              </Grid>
            </Grid>
          </Grid>
          </Box>
      </Grid>

    </ThemeProvider>
       
  );
}
