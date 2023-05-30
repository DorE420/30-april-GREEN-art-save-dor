import React, { useState, useEffect, useCallback } from "react";
import "./TeamCss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import TeamPopUp from "./TeamPopUp";
import { fetchEmployees } from "../api";
import { Button } from "react-bootstrap";
import {Menu,MenuHandler,MenuList,MenuItem} from "@material-tailwind/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/*
משימות שיש לי עוד לעשות בעמוד עובדים :
1. לסדר את התפריט הנפתח של עדכון/מחיקה
2. ליצור התראת אזהרה לפני מחיקה -ולאחר מכן לעדכן מחיקה
3. ליצור את האופציה של עדכון פרטי עובד
4. לסדר את הפופ-אפ של עובד עם תמונה, מגדר, וסיסמא
5. לסדר את הכיתוב שאין נתונים בטבלה להציג - במקום אנגלית לעברית
6. לעצב את הטבלה מבחינת צבעים ושורות
7. לסדר בטבלה את האופציה של תמונת עובד להצגה
8. להוסיף בטבלה sql תפקיד
*/

const urlGet = "https://proj.ruppin.ac.il/cgroup96/prod/api/employee/get";
const urlPost ="https://proj.ruppin.ac.il/cgroup96/prod/api/employee/post";
const urlDelete = "https://proj.ruppin.ac.il/cgroup96/prod/api/employee/delete";

const username = 'cgroup96';
const password = 'your_password';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

function addEmployee(item,refreshData){
  fetch(urlPost, {
    method: 'POST',
    headers: {
      ...headers, // Spread the existing headers
      'Content-Type': 'application/json' // Add the 'Content-Type' header
    },
    body: JSON.stringify(item)
  })
  .then(res => {
    console.log('res = ', res);
    console.log('res.status', res.status);
    console.log('res.ok', res.ok);
    return res.json()
  })
  .then(result => {
    console.log("Add Employee result = ", result);
    refreshData();
  })
  .catch(error => {
    console.log("Err post = ", error);
  });
}

function Team() {

  const [employeeDataInfo, setEmployeeDataInfo] = useState([]);
  const [employeeDataUpdate,setEmployeeDataUpdate] = useState(false);
  const [employeePopUp, setEmployeePopUp] = useState(false); 
  const [editEmployeePopUp,setEditEmployeePopUp] = useState(false);
  const [currentEmployee,setCurrentEmployee] = useState({});
  const [filterEmployeeData,setFilterEmployeeData] = useState("");
  const [openSetting,setOpenSetting] = useState(false);
  const refreshData = useCallback(() => setEmployeeDataUpdate(!employeeDataUpdate),[employeeDataUpdate]);

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://proj.ruppin.ac.il/cgroup96/prod/api/employee/get', {
          headers: {
            'Authorization': 'Basic ' + btoa('username:password')
          }
          })
        const data = await response.json();
        setEmployees(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching employees data: ", error);
      }
    };

    fetchData();
  }, []);*/


  function deleteEmployee(employeeId){
    fetch(urlDelete, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({employee_id : employeeId})
    })
    .then(res => {
      console.log('Employee Id is: ', employeeId);
      console.log('res = ', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then(result => {
      console.log("Delete Employee result = ", result);
      refreshData();
    })
    .catch(error => {
      console.log("Err delete = ", error);
    });
  };
  useEffect(() => {
    fetch(urlGet, {
      method: 'GET',
      headers: headers
    })
    .then(res => {
      console.log('res = ', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then(result => {
      console.log("fetch Employee = ", result);
      const updatedDatainfo = result.map(st => {
        return{
          employeeImg: st.employee_picture,
          employeeId: st.employee_id,
          employeeFirstname: st.employee_name,
          employeeLastname: st.employee_familyname,
          employeePhone: st.employee_PhoneNumber,
          employeeEmail: st.employee_email,
          employeeGender: st.employee_gender,
        };
      });
      console.log(updatedDatainfo);
      setEmployeeDataInfo(updatedDatainfo);
    })
    .catch(error => {
      console.log("Err post = ", error);
    });
  }, [employeeDataUpdate]);


  const columnsEmployee = [
    {
      name : "",
      selector : "employeeImg",
      sortable: true,
      right: true,
      width: "15%",
      /*cell: (row) => 
        <div className="employeeImgTable">
          {row.employeeImg}
        </div>,*/
    },
    {
      name: "תעודת זהות",
      selector: "employeeId",
      sortable: true,
      right: true, 
      width: "15%", 
    },
    {
      name: "שם פרטי",
      selector: "employeeFirstname",
      sortable: true,
      right: true,
      width: "15%", 
    },
    {
      name: "שם משפחה",
      selector: "employeeLastname",
      sortable: true,
      right: true,
      width: "15%", 
    },
    {
      name: "פרטי עובד",
      selector: "employeeInformation",
      right: true,
      width: "25%",
      cell: (row) => (
        <div className="infoDivEmployee">
          <div>
            {row.employeePhone}
            <label> : מספר טלפון</label>
          </div>
          <div>
            {row.employeeEmail}
            <label> : כתובת מייל</label>
          </div>
          <div>
            {row.employeeGender}
            <label> : מגדר</label>
          </div>
        </div>
      )
    },
    {
      name: "תפקיד",
      selector: "employeePosition",
      sortable: true,
      right: true,
      width: "10%", 
    },
    {
      name: "",
      selector: "setting",
      center: true,
      width: "5%", 
      cell: (row) => 
        (<div>
          <MoreVertIcon onClick={() => setOpenSetting((prev) => !prev )}/>
        </div>),
    },
  ];
  const reversedColumnsEmployee = [...columnsEmployee].reverse();

  const filteredData = filterEmployeeData ? employeeDataInfo.filter((item) =>
  item.employeeFirstname.toLowerCase().includes(filterEmployeeData.toLowerCase())
) : employeeDataInfo;


  return (
    <div id="mainBodyTeam">
      
      <div id="headerTeam">
        <button onClick={() => setEmployeePopUp(true)} className="buttonTeam">
          הוספת עובד חדש
        </button>
        <h1>צוות עובדים</h1>
      </div>

      <div id="innerMainTeam">
        <TeamPopUp trigger={employeePopUp} 
                   setTrigger={setEmployeePopUp}
                   addEmployee={(item) => addEmployee(item,refreshData)} />

        <div className="JobInfo">
          <div className="headerInnerInfo">

            <div className="selectBox">
              <select>
                <option value={""}></option>
                <option value={"option1"}>מנהל</option>
                <option value={"option2"}>נהג</option>
                <option value={"option3"}>מלקט</option>
                <option value={"option4"}>כללי</option>
              </select>
              <span>תפקיד</span>
            </div>

            <div className="searchBox">
              <input type={"text"}
                 value={filterEmployeeData}
                 onChange={(e) => setFilterEmployeeData(e.target.value)}
                 required="required"/>
              <span>שם עובד/ת</span>
            </div>           
             
          </div>

          <div className="mainInfo">
          <DataTable 
            columns={reversedColumnsEmployee} 
            data={filteredData} 
            highlightOnHover
            fixedHeader 
            />
            <div>
                      {openSetting === true ? (
            <div className="popUpSettingEmployee">
              <ul>
                <li className="liDeleteIcon"><DeleteIcon/></li>
                <li className="liUpdateIcon"><EditIcon/></li>
              </ul>
            </div>
          ) : ("")}
          </div>
          </div>
          <div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
