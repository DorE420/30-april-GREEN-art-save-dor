import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VehiclesCss.css";

const EditVehiclePopUp = ({
  trigger,
  setTrigger,
  updateVehiclesItem,
  vehicle,
}) => {
  const [editForm, setEditForm] = useState({
    licenseNum: vehicle ? vehicle.licenseNum : "",
    vehicleType1: vehicle ? vehicle.vehicleType1 : "",
    vehicleColor1: vehicle ? vehicle.vehicleColor1 : "",
    vehicleOwnership1: vehicle ? vehicle.vehicleOwnership1 : "",
    manufacturingYear1: vehicle ? vehicle.manufacturingYear1 : "",
  });
  useEffect(() => {
    // Update state when the vehicle prop changes
    if (vehicle) {
      setEditForm({
        licenseNum: vehicle.licenseNum,
        vehicleType1: vehicle.vehicleType1,
        vehicleColor1: vehicle.vehicleColor1,
        vehicleOwnership1: vehicle.vehicleOwnership1,
        manufacturingYear1: vehicle.manufacturingYear1,
      });
    }
  }, [vehicle]);

const handleInputChange = (event) => {
  setEditForm({
    ...editForm,
    [event.target.name]: event.target.value,
  });
  console.log("Edit inputs: ", editForm);
};
  const saveHandler = (e) => {
    e.preventDefault();
    const newItemInput = {
      licensePlateNum: editForm.licenseNum,
      vehicleType: editForm.vehicleType1,
      vehicleColor: editForm.vehicleColor1,
      vehicleOwnership: editForm.vehicleOwnership1,
      manufacturingYear: editForm.manufacturingYear1,
      key: editForm.licenseNum,
    };
    console.log( newItemInput);
     updateVehiclesItem(newItemInput); //-- this function casuing the popup not to work
    closeForm();
  }
  const closeForm = () => {
    console.log("close this form - Edit Vehicle");
    setTrigger(false);
  };
  return trigger ? (
    <>
      <div id="vehiclesPopUp">
        <div id="vehiclesInnerPopUp">
          <div className="headerInnerPopUp">
            <HighlightOffIcon onClick={closeForm} />
            <h1>עריכת רכב</h1>
          </div>
          <div id="innerPopUp">
            <div className="login__control">
              <div className="login__control">
                <label>מספר רישוי רכב</label>
                <span style={{fontWeight: "bold", textDecoration: "underline"}}>{editForm.licenseNum}</span>

              </div>
              <div className="login__control">
                <label>סוג רכב</label>
                <input
                  type="text"
                  name="vehicleType1"
                  value={editForm.vehicleType1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__control">
                <label>שנת ייצור</label>
                <input
                  placeholder="שנת יצור"
                  type="text"
                  name="manufacturingYear1"
                  value={editForm.manufacturingYear1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__control">
                <label>צבע רכב</label>
                <input
                  placeholder="צבע רכב"
                  type="text"
                  name="vehicleColor1"
                  value={editForm.vehicleColor1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__control">
                <label>בעלות הרכב</label>
                <input
                  placeholder="בעלות רכב"
                  type="text"
                  name="vehicleOwnership1"
                  value={editForm.vehicleOwnership1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputsInfo">
                <Button className="login_Button" onClick={saveHandler}>
                  {" "}
                  שמירת עדכונים
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};
export default EditVehiclePopUp;
