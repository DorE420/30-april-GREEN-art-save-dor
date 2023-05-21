import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VehiclesCss.css";

function UpdateVehiclePopUp({// trigger,// setTrigger, // updateVehiclesItem,
   vehicle,
}) {

  const [licensePlateNum, setLicensePlateNum] = useState(
    vehicle.licensePlateNum
  );
  const [vehicleType, setVehicleType] = useState(vehicle.vehicleType);
  const [vehicleColor, setVehicleColor] = useState(vehicle.vehicleColor);
  const [manufacturingYear, setManufacturingYear] = useState(
    vehicle.manufacturingYear
  );
  const [vehicleOwnership, setVehicleOwnership] = useState(
    vehicle.vehicleOwnership
  );

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

  useEffect(() => {
    setLicensePlateNum(vehicle.licensePlateNum);
    setVehicleType(vehicle.vehicleType);
    setVehicleColor(vehicle.vehicleColor);
    setManufacturingYear(vehicle.manufacturingYear);
    setVehicleOwnership(vehicle.vehicleOwnership);
  }, [vehicle]);

  const closeForm = () => {
    // setTrigger(false);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const updatedItemInput = {
      licensePlateNum: licensePlateNum,
      vehicleType: vehicleType,
      vehicleColor: vehicleColor,
      vehicleOwnership: vehicleOwnership,
      manufacturingYear: manufacturingYear,
      key: licensePlateNum,
    };

  //   console.log(updatedItemInput);
  //   updateVehiclesItem(updatedItemInput);
  //   // setTrigger(false);
  };

  return  (
    <div id="vehiclesPopUp">
      <div id="vehiclesInnerPopUp">
        <div className="headerInnerPopUp">
          <HighlightOffIcon onClick={closeForm} />
          <h1>עדכון רכב קיים</h1>
        </div>
        <div id="mainInfoPopUp">
          <div className="rightInnerPopUp">
            <div className="inputsInfo">
              <label>מספר רישוי רכב</label>
              <input
                placeholder="מספר רכב"
                type="text"
                value={licensePlateNum}
                onChange={licenseHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>סוג רכב</label>
              <input
                placeholder="סוג רכב"
                type="text"
                value={vehicleType}
                onChange={vehicleHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>שנת ייצור</label>
              <input
                placeholder="שנת יצור"
                type="text"
                value={manufacturingYear}
                onChange={manufacturingYearHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>צבע רכב</label>
              <input
                placeholder="צבע רכב"
                type="text"
                value={vehicleColor}
                onChange={vehicleColorHandler}
              />
            </div>
            <div className="inputsInfo">
              <label>בעלות הרכב</label>
              <input
                placeholder="בעלות רכב"
                type="text"
                value={vehicleOwnership}
                onChange={vehicleOwnershipHandler}
              />
            </div>
            <div className="inputsInfo">
              <Button className="login_Button" onClick={updateHandler}>
                {" "}
                עדכון רכב קיים
              </Button>
            </div>
          </div>

          <div className="leftInnerPopUp">
            <label>העלאת מסמכים</label>

            <div className="inputsInfo">
              <label>רישיון רכב</label>
              <input type={"file"} />
            </div>

            <div className="inputsInfo">
              <label>ביטוח רכב</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default UpdateVehiclePopUp;

    // vehicle = vehicle || {
    //   licensePlateNum: "",
    //   vehicleType: "",
    //   vehicleColor: "",
    //   manufacturingYear: "",
    //   vehicleOwnership: "",
    // };