import React, { useEffect, useState } from 'react'
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { useHttp } from '../hooks/fetchHook';

const style = {
  position: 'absolute',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '4px',
  p: 4,
  '& > *': {
    paddingBottom: '25px',
    textAlign: 'center',
  },
  '& *': {
    margin: '12px',
    minWidth: '300px'
  }
};




export default function UpdateModal({ open, setOpen, employee, reload }) {
  const handleClose = () => { reload(true); setOpen(false) };
  const [response, setResponse] = useState(null);
  const { request, loading } = useHttp();
  const employeeId = React.useRef();
  const [updatedEmployee, setUpdatedEmployee] = useState({
    id: employee,
    employeeSurname: null,
    employeeSalary: null,
    managerSurname: null
  })
  const [error, setError] = useState();
  const clickHandler = async () => {
    try {
      setError(null);
      if (!updatedEmployee.employeeSalary || !updatedEmployee.employeeSurname || !updatedEmployee.managerSurname) {
        setError("Fill Requers Fields");
        return
      }
      console.log(updatedEmployee);
      const response = await request('api/office/updateEmployee', "POST", { ...updatedEmployee });
      setResponse(response.message);
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    if (open) {
      employeeId.current = employee;
      setUpdatedEmployee({ ...updatedEmployee, ['id']: employeeId.current });
      setError(null)
    }
  }, [employee, open])


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Обновить данные о пользователе
          </Typography>
          <TextField required disabled={loading} onChange={e => setUpdatedEmployee({ ...updatedEmployee, ['employeeSurname']: e.currentTarget.value })} id="name-update" label="Фамилия сотрудника" variant="filled" />
          <TextField required type="number" disabled={loading} onChange={e => setUpdatedEmployee({ ...updatedEmployee, ['employeeSalary']: e.currentTarget.value })} id="salary-update" label="Зарплата сотрудника" variant="filled" />
          <TextField required disabled={loading} onChange={e => setUpdatedEmployee({ ...updatedEmployee, ['managerSurname']: e.currentTarget.value })} id="manager-update" label="Фамилия менеджера" variant="filled" />
          {error && <Box sx={{ border: '1px solid red', borderRadius: '4px', width: '100px', height: '20px', backgroundColor: 'rgba(255, 0,0 ,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: "25px" }}><Typography color="error">{error}</Typography></Box>}
          {response !== null && <Box sx={{ border: '1px solid green', borderRadius: '4px', width: '100px', height: '20px', backgroundColor: 'rgba(0, 255,0 ,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: "25px" }}><Typography color="textPrimary">{response}</Typography></Box>}
          <Button disabled={loading} variant="contained" color="primary" onClick={clickHandler}>Обновить</Button>
        </Box>
      </Modal>
    </div>
  );
}