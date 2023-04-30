import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VehiclesCss.css";

function NewVehicleMaintenance({ trigger, setTrigger, addMaintenanceItem, vehicles }) {

    const [maintenanceId, setMaintenanceId] = useState("");
    const [maintenanceDate, setMaintenanceDate] = useState("");
    const [maintenanceDescription, setMaintenanceDescription] = useState("");
    const [garageName, setGarageName] = useState("");
    const [selectedLicenseNum, setSelectedLicenseNum] = useState("");

    const maintenanceIdHandler = (e) => {
        setMaintenanceId(e.target.value);
      };
      
      const maintenanceDateHandler = (e) => {
        setMaintenanceDate(e.target.value);
      };
      
      const maintenanceDescriptionHandler = (e) => {
        setMaintenanceDescription(e.target.value);
      };
      
      const garageNameHandler = (e) => {
        setGarageName(e.target.value);
      };
      
      const handleLicenseNumChange = (event) => {
        setSelectedLicenseNum(event.target.value);
      };

      const closeForm = () => {
        setTrigger(false);
      };

      const resetTextHandler = () => {
        setMaintenanceId("");
        setMaintenanceDate("");
        setMaintenanceDescription("");
        setGarageName("");
        setSelectedLicenseNum(""); // Reset the selectedLicenseNum state as well
      };

      const saveHandler = (e) => {
        e.preventDefault();
        const newItemInput = {
          maintenance_id: maintenanceId,
          maintenance_date: maintenanceDate,
          maintenance_description: maintenanceDescription,
          garageName: garageName,
          vehicle_id: selectedLicenseNum
          
        };
      
        console.log(newItemInput);
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
            <div id="mainInfoPopUp">
              <div className="rightInnerPopUp">
                <div className="inputsInfo">
                  <label>מספר טיפול</label>
                  <input
                    placeholder="מספר טיפול"
                    type="text"
                    value={maintenanceId}
                    onChange={maintenanceIdHandler}
                  />
                </div>
                <div className="inputsInfo">
                  <label>תאריך טיפול</label>
                  <input
                    placeholder="Maintenance Date"
                    type="date"
                    value={maintenanceDate}
                    onChange={maintenanceDateHandler}
                  />
                </div>
                <div className="inputsInfo">
                  <label>תיאור הטיפול</label>
                  <input
                    placeholder="טיפול 30 אלף"
                    type="text"
                    value={maintenanceDescription}
                    onChange={maintenanceDescriptionHandler}
                  />
                </div>
                <div className="inputsInfo">
                  <label>שם המוסך</label>
                  <input
                    placeholder="מוסך הארבעה"
                    type="text"
                    value={garageName}
                    onChange={garageNameHandler}
                  />
                </div>
                <div className="inputsInfo">
                <label>מספר רישוי</label>
                  <select value={selectedLicenseNum} onChange={handleLicenseNumChange}>
                  <option value="">בחר מספר רישוי</option>
                 {vehicles.map((vehicle) => (
                 <option key={vehicle.licenseNum} value={vehicle.licenseNum}>
                  {vehicle.licenseNum}
                </option>
          ))}
        </select>
                </div>
                <div className="inputsInfo">
                  <Button className="login_Button" onClick={saveHandler}>
                    שמירת תחזוקת רכב חדשה
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