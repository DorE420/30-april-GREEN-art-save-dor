import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TeamCss.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UploadIcon from '@mui/icons-material/Upload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AvatarEmployee from "../../images/profileEmployee.png";

function TeamPopUp({ trigger, setTrigger, addEmployee, children }) {

  const [emplolyeeImg,setEmplolyeeImg] = useState(null);
  const [emplolyeeId,setEmplolyeeId] = useState("");
  const [emplolyeeName, setEmplolyeeName] = useState("");
  const [emplolyeeSurName, setEmplolyeeSurName] = useState("");
  const [emplolyeePosition, setEmplolyeePosition] = useState("");
  const [emplolyeePhone, setEmplolyeePhone] = useState("");
  const [emplolyeeEmail, setEmplolyeeEmail] = useState("");
  const [emplolyeeGender,setEmplolyeeGender] = useState("");
  const [employeePassword,setEmployeePassword] = useState("");
  const [employeeBirthDate, setEmployeeBirthDate] = useState(null);
  const fileInputRef = useRef(null);

  const setEmplolyeeImgInput = (e) => {
    const file = e.target.files[0];
    setEmplolyeeImg(URL.createObjectURL(file));
  };
  const setEmplolyeeIdInput = (e) => {
    setEmplolyeeId(e.target.value);
    console.log("Id :" + e.target.value);
  };
  const setEmplolyeeNameInput = (e) => {
    setEmplolyeeName(e.target.value);
    console.log("First Name:" + e.target.value);
  }
  const setEmplolyeeSurNameInput = (e) => {
    setEmplolyeeSurName(e.target.value);
   console.log("Last Name:" + e.target.value);
  };
  const setEmplolyeePositionInput = (e) => {
    setEmplolyeePosition(e.target.value);
    console.log("Position:" + e.target.value);
  };
  const setEmplolyeePhoneInput = (e) => {
    setEmplolyeePhone(e.target.value);
     console.log("Phone:" + e.target.value);
  };
  const setEmplolyeeEmailInput = (e) => {
      setEmplolyeeEmail(e.target.value);
       console.log("Email:" + e.target.value);
  };
  const setEmplolyeeGenderInput = (e) => {
      setEmplolyeeGender(e.target.value);
      console.log("Gender :" + e.target.value);
  };
  const setEmployeePasswordInput = (e) => {
      setEmployeePassword(e.target.value);
      console.log("Password : " + e.target.value);
  };
  const setEmployeeBirthDateInput = (e) => {
    setEmployeeBirthDate(e.target.value);
    console.log("Birth Date : " + e.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const saveHandler = (e) => {
    e.preventDefault();
    const newEmplInput = {
      employee_picture:emplolyeeImg,
      employee_id:emplolyeeId,
      employee_name:emplolyeeName,
      employee_familyname:emplolyeeSurName,
      employee_PhoneNumber:emplolyeePhone,
      employee_email:emplolyeeEmail,
      employee_gender:emplolyeeGender,
      employee_position:emplolyeePosition,
      employee_pw:employeePassword,
      employee_startDate:employeeBirthDate
    };
    console.log(
      "*************************************************************************"
    );
    console.log(newEmplInput);
    addEmployee(newEmplInput);
    resetTextHandler();
    setTrigger(false);
  };
  const resetTextHandler = () => {
    setEmplolyeeImg("");
    setEmplolyeeId("");
    setEmplolyeeName("");
    setEmplolyeeSurName("");
    setEmplolyeePosition("");
    setEmplolyeePhone("");
    setEmplolyeeEmail("");
    setEmplolyeeGender("");
  };
  const closeForm = () => {
    resetTextHandler();
    setTrigger(false);
  };

  return trigger ? (
    <div className="popUp">
      <div className="innerPopUp">
        <div className="innerEmloyee1">
          <HighlightOffIcon onClick={closeForm} />
        </div>
        <div className="innerEmloyee2">
          <h1>יצירת איש צוות חדש</h1>
        </div>
        <div className="innerEmloyee3">

          <div className="innerDiv3-2">
            <div className="innerDivUploadImg">
              <div className="imgEmployee">
                {emplolyeeImg ? (
                  <img src={emplolyeeImg} alt="Avatar"/>
                  ):(
                  <img src={AvatarEmployee} alt="Avatar"/>)}
              </div>
              <div onClick={handleUploadClick}>
                <span>לחץ/י להעלאת תמונה</span>
                <UploadIcon/>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{display: 'none'}}
                  onChange={setEmplolyeeImgInput}/>
              </div>
            </div>
          </div>

          <div className="innerDiv3-1">
            <div className="leftinnerDiv-3">
              <div className="input1">
                <input
                  type="text"
                  value={emplolyeeId}
                  onChange={setEmplolyeeIdInput}
                  required="required"/>
                  <span>מספר תעודת זהות</span>
              </div>
              <div className="input1">
                <input
                  type="text"
                  value={emplolyeePosition}
                  onChange={setEmplolyeePositionInput}
                  required="required"/>
                  <span>תפקיד</span>
              </div>
            </div>
            <div className="leftinnerDiv-3">
              <div className="input1">
                <input
                  type="text"
                  value={emplolyeeSurName}
                  onChange={setEmplolyeeSurNameInput}
                  required="required"/>
                  <span>שם משפחה</span>
              </div>
              <div className="input1">
                  <input
                    type="text"
                    value={emplolyeeName}
                    onChange={setEmplolyeeNameInput}
                    required="required"/>
                    <span>שם פרטי</span>
              </div>
            </div>
            <div className="leftinnerDiv-3">
              <div className="input1">
                <input
                  type="text"
                  value={emplolyeePhone}
                  onChange={setEmplolyeePhoneInput}
                  required="required"/>
                  <span>מספר טלפון</span>
              </div>
              <div className="input1">
                <input
                  type="text"
                  value={emplolyeeEmail}
                  onChange={setEmplolyeeEmailInput}
                  required="required"/>
                  <span>כתובת מייל</span>
              </div>
            </div>
            <div className="leftinnerDiv-3">
              <div className="input1">
                  <input 
                    type="text"
                    value={employeePassword}
                    onChange={setEmployeePasswordInput}
                    required="required"/>
                    <span>סיסמא</span>
              </div>
              <div className="input1">
                <input
                  type="date"
                  value={employeeBirthDate}
                  onChange={setEmployeeBirthDateInput}/>
                  <span>תאריך לידה</span>
              </div>
            </div>

            <div className="leftinnerDiv-3">
            <div className="input1">
            <select
             className="genderSelect"
              placeholder="מגדר"
            onChange={setEmplolyeeGenderInput}
            >
             <option value={"זכר"}>זכר</option>
            <option value={"נקבה"}>נקבה</option>
           <option value={"אחר"}>אחר</option>
          </select>
              </div>
              <Button className="saveNewEmployee" onClick={saveHandler}>
                שמירה
              </Button>
            </div>


          </div>

        </div>
          {children}
      </div>
    </div>
  ) : ("");
}
export default TeamPopUp;
