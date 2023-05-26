import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Components/LoginForm";
import Layout from "./Components/Layout";
import EditVehiclePopUp from "./Pages/VehiclesPage/EditVehiclePopUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App(){
  
  const [ currentForm, setCurrentForm] = useState('loginform');
  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div>
      {/* {currentForm === "loginform" ? (
        <LoginForm onFormSwitch={toggleForm} />
      ) : (
        <Layout />
      )} */}
      <ToastContainer />
      <Layout />
      {/* <EditVehiclePopUp /> */}
    </div>
  );

}
export default App;
