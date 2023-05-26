import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VehiclesCss.css";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import he from "date-fns/locale/he";
import "react-datepicker/dist/react-datepicker.css";

registerLocale('he', he);
setDefaultLocale('he');


function NewVehicleMaintenance({
  trigger,
  setTrigger,
  addMaintenanceItem,
  selectedLicenseForMaintenance,
}) {
  const [maintenanceId, setMaintenanceId] = useState("");
  // const [maintenanceDate, setMaintenanceDate] = useState("");
  const [maintenanceDescription, setMaintenanceDescription] = useState("");
  const [garageName, setGarageName] = useState("");
  const [selectedLicenseNum, setSelectedLicenseNum] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState(new Date());
  const maintenanceIdHandler = (e) => {
    setMaintenanceId(e.target.value);
  };

  const maintenanceDateHandler = (e) => {
    setMaintenanceDate(e.target.value);
  };

  const maintenanceDescriptionHandler = (e) => {
    setMaintenanceDescription(e.target.value);
    console.log("Maintenance Description: ", e.target.value);
  };

  const garageNameHandler = (e) => {
    setGarageName(e.target.value);
    console.log("Garage Name: ", e.target.value);
  };

  // const handleLicenseNumChange = (event) => {
  //   setSelectedLicenseNum(event.target.value);
  // };

  const closeForm = () => {
    setTrigger(false);
  };

  const resetTextHandler = () => {
    setMaintenanceId("");
    setMaintenanceDate("");
    setMaintenanceDescription("");
    setGarageName("");
    // setSelectedLicenseNum(""); // Reset the selectedLicenseNum state as well
  };

  const saveHandler = (e) => {
    e.preventDefault();
    const newItemInput = {
      maintenance_id: maintenanceId,
      maintenance_date: maintenanceDate,
      maintenance_description: maintenanceDescription,
      garageName: garageName,
      vehicle_id: selectedLicenseForMaintenance,
      
    };

    console.log("New Maintenance Input: ", newItemInput);
    addMaintenanceItem(newItemInput);
    resetTextHandler();
    setTrigger(false);
  };

  return trigger ? (
    <div id="vehiclesPopUp">
      <div id="vehiclesInnerPopUp">
        <div className="headerInnerPopUp">
          <HighlightOffIcon onClick={closeForm} />
          <h1>הוספת תחזוקת רכב חדשה</h1>
        </div>
        <div id="innerPopUp">
          <div className="login__control">
            <div className="login__control">
            <span style={{fontWeight: "bold", textDecoration: "underline"}}>מספר רישוי : {selectedLicenseForMaintenance}</span>
              <label>תאריך טיפול</label>
              {/* <input
                    placeholder="Maintenance Date"
                    type="date"
                    value={maintenanceDate}
                    onChange={maintenanceDateHandler}
                  /> */}
              <DatePicker
                selected={maintenanceDate}
                onChange={(date) => setMaintenanceDate(date)}
                locale={he}
              />
            </div>
            <div className="login__control">
              <label>תיאור הטיפול</label>
              <input
                placeholder="טיפול 30 אלף"
                type="text"
                value={maintenanceDescription}
                onChange={maintenanceDescriptionHandler}
              />
            </div>
            <div className="login__control">
              <label>שם המוסך</label>
              <input
                placeholder="מוסך הארבעה"
                type="text"
                value={garageName}
                onChange={garageNameHandler}
              />
            </div>
            <div className="login__control">
              <label>מספר טיפול</label>
              <input
                placeholder="3423523"
                type="text"
                value={maintenanceId}
                onChange={maintenanceIdHandler}
              />
            </div>
            <div className="inputsInfo">
              <Button className="login_Button" onClick={saveHandler}>
                שמור
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default NewVehicleMaintenance;
