import React from 'react'
import EmployeesGrid from '../Components/EmployeesGrid'
import { useHttp } from '../hooks/fetchHook';
import { Box, CircularProgress } from '@material-ui/core'


export const ShowAllEmployeesPage = () => {
  const [employees, setEmployees] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const { request, loading } = useHttp();
  React.useEffect(() => {

    async function fetchEmployees() {
      const res = await request('api/office', 'GET')
      setEmployees(res)

    }
    fetchEmployees();
    setReload(false)

  }, [reload]);



  return (
    <div>
      {loading ? <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress size={140} /></Box> :
        <EmployeesGrid employees={employees} reload={setReload} />}
    </div>)
}