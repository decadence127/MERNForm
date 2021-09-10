import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { EmployeeCreationPage } from "./Pages/EmployeeCreationPage"
import { ShowAllEmployeesPage } from "./Pages/ShowAllEmployeesPage"

export const pageRoutes = () =>{
return(<Switch>
  <Route path="/" exact>
    <ShowAllEmployeesPage />
  </Route>
  <Route path="/EmployeeCreation"exact>
    <EmployeeCreationPage />
  </Route>
  <Redirect to="/"/>
</Switch>)
}