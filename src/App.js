import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Components/LoginForm";
import Layout from "./Components/Layout";
import EditVehiclePopUp from "./Pages/VehiclesPage/EditVehiclePopUp";
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
      <Layout />
      {/* <EditVehiclePopUp /> */}
    </div>
  );

}
export default App;
