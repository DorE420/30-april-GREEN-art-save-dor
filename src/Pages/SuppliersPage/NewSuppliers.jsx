import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DatePicker, { registerLocale } from "react-datepicker";
import he from "date-fns/locale/he"; // import Hebrew locale
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
registerLocale("he", he);

const NewSuppliers = ({ trigger, setTrigger, addSupplier, children }) => {
  const [supplierData, setSupplierData] = useState({
    businessNumber: "",
    startWorkDate: new Date(),
    companyAddress: "",
    companyEmail: "",
    repName: "",
    repLastName: "",
    repEmailAddress: "",
  });

  // function MyDatePicker() {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //       locale="he"
  //     />
  //   );
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSupplierData((prevData) => ({
      ...prevData,
      startWorkDate: date,
    }));
  };

  const saveHandler = (e) => {
    e.preventDefault();
    setTrigger(false);
    console.log("*************************");
    console.log(supplierData);
    console.log("*************************");
    addSupplier(supplierData);
    resetTextHandler();
  };

  const resetTextHandler = () => {
    setSupplierData({
      businessNumber: "",
      startWorkDate: new Date(),
      companyAddress: "",
      companyEmail: "",
      repName: "",
      repLastName: "",
      repEmailAddress: "",
    });
  };

  const closeForm = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div id="vehiclesPopUp">
      <div id="vehiclesInnerPopUp">
        <div className="headerInnerPopUp">
          <HighlightOffIcon onClick={closeForm} />
          <h1>הוספת ספק חדש</h1>
        </div>
        <div id="innerPopUp">
          <div className="login__control">
            <label>שם ספק</label>
            <input
              name="repName"
              placeholder="דני עיצובים"
              type="text"
              value={supplierData.repName}
              onChange={handleInputChange}
            />
          </div>
          <div className="login__control">
            <label>שם איש קשר</label>
            <input
              name="repLastName"
              placeholder=" שרון קלוסקר"
              type="text"
              value={supplierData.repLastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="login__control">
            <label> ח"פ</label>
            <input
              name="businessNumber"
              placeholder=" 7895439454"
              type="text"
              value={supplierData.businessNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="login__control">
            <label> Email</label>
            <input
              name="companyEmail"
              placeholder=" rick&morty@barkoni.com"
              type="text"
              value={supplierData.companyEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="login__control">
            <label>תאריך התקשרות</label>
            <DatePicker
              name="startWorkDate"
              selected={supplierData.startWorkDate}
              onChange={handleDateChange}
              locale="he"
            />
          </div>
          <div className="login__control">
            <label> כתובת</label>
            <input
              name="companyAddress"
              placeholder=" מעלה עקרבים 5 אילת"
              type="text"
              value={supplierData.companyAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputsInfo">
            <Button className="login_Button" onClick={saveHandler}>
              {" "}
              שמירת ספק חדש
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default NewSuppliers;
