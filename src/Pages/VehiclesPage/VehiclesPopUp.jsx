import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VehiclesCss.css";

function NewVehicles({ trigger, setTrigger, addVehiclesItem, children }) {
  const [licensePlateNum, setLicensePlateNum] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [vehicleOwnership, setVehicleOwnership] = useState("");

  const licenseHandler = (e) => {
    setLicensePlateNum(e.target.value);
    
  };
  const vehicleHandler = (e) => {
    setVehicleType(e.target.value);
    
  };

  const vehicleColorHandler = (e) => {
    setVehicleColor(e.target.value);
    
  };
  const manufacturingYearHandler = (e) => {
    setManufacturingYear(e.target.value);
    
  };
  const vehicleOwnershipHandler = (e) => {
    setVehicleOwnership(e.target.value);
    
  };

  const saveHandler = (e) => {
    e.preventDefault();
    const newItemInput = {
      licensePlateNum: licensePlateNum,
      vehicleType: vehicleType,
      vehicleColor: vehicleColor,
      vehicleOwnership: vehicleOwnership,
      manufacturingYear: manufacturingYear,
      key: licensePlateNum,
    };

    console.log(newItemInput);
    addVehiclesItem(newItemInput);
    resetTextHandler();
    setTrigger(false);
  };
  const resetTextHandler = () => {
    setLicensePlateNum("");
    setVehicleType("");
    setVehicleColor("");
    setManufacturingYear("");
    setVehicleOwnership("");
  };
  const closeForm = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div id="vehiclesPopUp">
      <div id="vehiclesInnerPopUp">
        <div className="headerInnerPopUp">
          <HighlightOffIcon onClick={closeForm} />
          <h1>הוספת רכב חדש</h1>
        </div>
        <div id="innerPopUp">
          <div className="login__control">
            <label>מספר רישוי רכב</label>
            <input
              placeholder="מספר רכב"
              type="text"
              value={licensePlateNum}
              onChange={licenseHandler}
            />
          </div>
          <div className="login__control">
            <label>סוג רכב</label>
            <input
              placeholder="סוג רכב"
              type="text"
              value={vehicleType}
              onChange={vehicleHandler}
            />
          </div>
          <div className="login__control">
            <label>שנת ייצור</label>
            <input
              placeholder="שנת יצור"
              type="text"
              value={manufacturingYear}
              onChange={manufacturingYearHandler}
            />
          </div>
          <div className="login__control">
            <label>צבע רכב</label>
            <input
              placeholder="צבע רכב"
              type="text"
              value={vehicleColor}
              onChange={vehicleColorHandler}
            />
          </div>
          <div className="login__control">
            <label>בעלות הרכב</label>
            <input
              placeholder="בעלות רכב"
              type="text"
              value={vehicleOwnership}
              onChange={vehicleOwnershipHandler}
            />
          </div>
          <div className="inputsInfo">
            <Button className="login_Button" onClick={saveHandler}>
              {" "}
              שמירת רכב חדש
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default NewVehicles;