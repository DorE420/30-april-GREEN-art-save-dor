import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function EditEmployee({trigger, setTrigger, onEditEmployee, currentEmployee, children}){

    const [emplolyeeImg,setEmplolyeeImg] = useState(currentEmployee.emplolyeeImg);
    const [emplolyeeId,setEmplolyeeId] = useState(currentEmployee.emplolyeeId);
    const [emplolyeeName, setEmplolyeeName] = useState(currentEmployee.emplolyeeName);
    const [emplolyeeSurName, setEmplolyeeSurName] = useState(currentEmployee.emplolyeeSurName);
    const [emplolyeePosition, setEmplolyeePosition] = useState(currentEmployee.emplolyeePosition);
    const [emplolyeePhone, setEmplolyeePhone] = useState(currentEmployee.emplolyeePhone);
    const [emplolyeeEmail, setEmplolyeeEmail] = useState(currentEmployee.emplolyeeEmail);
    const [emplolyeeGender,setEmplolyeeGender] = useState(currentEmployee.emplolyeeGender);

    useEffect(() => {
        setEmplolyeeImg(currentEmployee.emplolyeeImg);
        setEmplolyeeId(currentEmployee.emplolyeeId);
        setEmplolyeeName(currentEmployee.emplolyeeName);
        setEmplolyeeSurName(currentEmployee.emplolyeeSurName);
        setEmplolyeePosition(currentEmployee.emplolyeePosition);
        setEmplolyeePhone(currentEmployee.emplolyeePhone);
        setEmplolyeeEmail(currentEmployee.emplolyeeEmail);
        setEmplolyeeGender(currentEmployee.emplolyeeGender);
    }, [currentEmployee]);

    const setEmplolyeeImgInput = (e) => {
        setEmplolyeeImg(e.target.value);
        console.log("Employee Image : " + e.target.value);
    };
    const setEmplolyeeIdInput = (e) => {
        setEmplolyeeId(e.target.value);
        console.log("Employee Id : " + e.target.value);
    }
    const setEmplolyeeNameInput = (e) => {
        setEmplolyeeName(e.target.value);
        console.log("Employee Name : " + e.target.value);
    }
    const setEmplolyeeSurNameInput = (e) => {
        setEmplolyeeSurName(e.target.value);
        console.log("Employee Last Name : " + e.target.value);
    }
    const setEmplolyeePositionInput = (e) => {
        setEmplolyeePosition(e.target.value);
        console.log("Employee Position : " + e.target.value);
    }
    const setEmplolyeePhoneInput = (e) => {
        setEmplolyeePhone(e.target.value);
        console.log("Employee Phone : " + e.target.value);
    }
    const setEmplolyeeEmailInput = (e) => {
        setEmplolyeeEmail(e.target.value);
        console.log("Employee Email : " + e.target.value);
    }
    const setEmplolyeeGenderInput = (e) => {
        setEmplolyeeGender(e.target.value);
        console.log("Employee Gender : " + e.target.value);
    }

    const updateHandler = (e) => {
        e.preventDefault();
        const updateEmployee = {
            employee_picture:emplolyeeImg,
            employee_id:emplolyeeId,
            employee_name:emplolyeeName,
            employee_familyname:emplolyeeSurName,
            employee_PhoneNumber:emplolyeePhone,
            employee_email:emplolyeeEmail,
            employee_gender:emplolyeeGender,
        };
        onEditEmployee(currentEmployee.emplolyeeId, updateEmployee);
        setTrigger(false);
    };

    const closeForm = () => {
        setTrigger(false);
    };

    return trigger ? (
        <div>
            
        </div>
    ) : ("");
}

export default EditEmployee;