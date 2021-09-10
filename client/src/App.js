import React from "react";
import { BrowserRouter } from "react-router-dom";
import { pageRoutes } from "./routes";

function App() {
  const routes = pageRoutes();
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
