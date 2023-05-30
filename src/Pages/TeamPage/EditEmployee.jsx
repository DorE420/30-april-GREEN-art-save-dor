// import React, { useEffect, useRef, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import UploadIcon from '@mui/icons-material/Upload';
// import AvatarEmployee from '../../images/profileEmployee.png';
// function EditEmployee({trigger, setTrigger, onEditEmployee, currentEmployee, children}){

//     const [emplolyeeImg,setEmplolyeeImg] = useState(currentEmployee.emplolyeeImg);
//     const [emplolyeeId,setEmplolyeeId] = useState(currentEmployee.emplolyeeId);
//     const [emplolyeeName, setEmplolyeeName] = useState(currentEmployee.emplolyeeName);
//     const [emplolyeeSurName, setEmplolyeeSurName] = useState(currentEmployee.emplolyeeSurName);
//     const [emplolyeePosition, setEmplolyeePosition] = useState(currentEmployee.emplolyeePosition);
//     const [emplolyeePhone, setEmplolyeePhone] = useState(currentEmployee.emplolyeePhone);
//     const [emplolyeeEmail, setEmplolyeeEmail] = useState(currentEmployee.emplolyeeEmail);
//     const [emplolyeeGender,setEmplolyeeGender] = useState(currentEmployee.emplolyeeGender);

//     useEffect(() => {
//         setEmplolyeeImg(currentEmployee.emplolyeeImg);
//         setEmplolyeeId(currentEmployee.emplolyeeId);
//         setEmplolyeeName(currentEmployee.emplolyeeName);
//         setEmplolyeeSurName(currentEmployee.emplolyeeSurName);
//         setEmplolyeePosition(currentEmployee.emplolyeePosition);
//         setEmplolyeePhone(currentEmployee.emplolyeePhone);
//         setEmplolyeeEmail(currentEmployee.emplolyeeEmail);
//         setEmplolyeeGender(currentEmployee.emplolyeeGender);
//     }, [currentEmployee]);

//     const setEmplolyeeImgInput = (e) => {
//         setEmplolyeeImg(e.target.value);
//         console.log("Employee Image : " + e.target.value);
//     };
//     const setEmplolyeeIdInput = (e) => {
//         setEmplolyeeId(e.target.value);
//         console.log("Employee Id : " + e.target.value);
//     }
//     const setEmplolyeeNameInput = (e) => {
//         setEmplolyeeName(e.target.value);
//         console.log("Employee Name : " + e.target.value);
//     }
//     const setEmplolyeeSurNameInput = (e) => {
//         setEmplolyeeSurName(e.target.value);
//         console.log("Employee Last Name : " + e.target.value);
//     }
//     const setEmplolyeePositionInput = (e) => {
//         setEmplolyeePosition(e.target.value);
//         console.log("Employee Position : " + e.target.value);
//     }
//     const setEmplolyeePhoneInput = (e) => {
//         setEmplolyeePhone(e.target.value);
//         console.log("Employee Phone : " + e.target.value);
//     }
//     const setEmplolyeeEmailInput = (e) => {
//         setEmplolyeeEmail(e.target.value);
//         console.log("Employee Email : " + e.target.value);
//     }
//     const setEmplolyeeGenderInput = (e) => {
//         setEmplolyeeGender(e.target.value);
//         console.log("Employee Gender : " + e.target.value);
//     }
    
//     const updateHandler = (e) => {
//         e.preventDefault();
//         const updateEmployee = {
//             employee_picture:emplolyeeImg,
//             employee_id:emplolyeeId,
//             employee_name:emplolyeeName,
//             employee_familyname:emplolyeeSurName,
//             employee_PhoneNumber:emplolyeePhone,
//             employee_email:emplolyeeEmail,
//             employee_gender:emplolyeeGender,
//         };
//         onEditEmployee(currentEmployee.emplolyeeId, updateEmployee);
//         setTrigger(false);
//     };

//     const closeForm = () => {
//         setTrigger(false);
//     };

//     return trigger ? (
//         <div>
            
//         </div>
//     ) : ("");
// }

// export default EditEmployee;
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UploadIcon from '@mui/icons-material/Upload';
import AvatarEmployee from '../../images/profileEmployee.png';
import "./EditEmployee.css";
const urlUpdate ="https://proj.ruppin.ac.il/cgroup96/prod/api/employee/put";
const username = 'cgroup96';
const password = 'your_password';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

function updateEmployee(employeeId, updatedEmployee, refreshData){
  fetch(`${urlUpdate}/${employeeId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedEmployee)
  })
  .then(res => {
    console.log('res = ', res);
    console.log('res.status', res.status);
    console.log('res.ok', res.ok);
    return res.json()
  })
  .then(result => {
    console.log("Update Employee result = ", result);
    refreshData();
  })
  .catch(error => {
    console.log("Err put = ", error);
  });
}

function EditEmployee({trigger, setTrigger, currentEmployee, refreshData}){
  const [employee, setEmployee] = useState(currentEmployee);

  useEffect(() => {
    setEmployee(currentEmployee);
  }, [currentEmployee]);

  const updateHandler = (e) => {
    e.preventDefault();
    updateEmployee(employee.employeeId, employee, refreshData);
    setTrigger(false);
  };

  const closeForm = () => {
    setTrigger(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({...employee, [name]: value });
  };

  return trigger ? (
    <div>
      <form onSubmit={updateHandler}>
        {/* rest of your form elements, use handleInputChange for onChange event */}
        <input
          type="text"
          name="employeeId"
          value={employee.employeeId}
          onChange={handleInputChange}
          required
        />
        {/* Repeat the above pattern for other fields */}
        <Button type="submit">Update Employee</Button>
      </form>
      <Button onClick={closeForm}><HighlightOffIcon /></Button>
    </div>
  ) : "";
}

export default EditEmployee;
