
import React from 'react';
import "./App.css";
import  { useRoutes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './NavBar/NavBar';
import { routes } from './routes';

const App = () => {

  // const token = localStorage.getItem("token");

  const element = useRoutes(routes);

  return (
    <>
      <NavBar/>
      {element}
    </>
  )
}

export default App;


