import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TeamPopUp from "./TeamPopUp";
import "./TeamCss.css";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Team = () => {
  const [employees, setEmployees] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://proj.ruppin.ac.il/cgroup96/prod/api/employee/get",
          {
            headers: {
              Authorization: "Basic " + btoa("username:password"),
            },
          }
        );
        const data = await response.json();
        setEmployees(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching employees data: ", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "תעודת זהות",
      selector: "employee_id",
      sortable: true,
      right: true,
      width: "10%",
    },
    {
      name: "שם פרטי",
      selector: "employee_name",
      sortable: true,
      right: true,
      width: "10%",
    },
    {
      name: "שם משפחה",
      selector: "employee_familyname",
      sortable: true,
      right: true,
      width: "10%",
    },
    {
      name: "טלפון",
      selector: "employee_PhoneNumber",
      sortable: true,
      right: true,
      width: "10%",
    },
    {
      name: "Email",
      selector: "employee_email",
      sortable: true,
      right: true,
      width: "18%",
      cell: (row) => (
        <a href={`mailto:${row.employee_email}`}>{row.employee_email}</a>
      ),
    },
    {
      name: "תפקיד",
      selector: "employee_position ",
      sortable: true,
      right: true,
      width: "10%",
    },
    {
      name: "תאריך תחילת עבודה",
      selector: "employee_startDate",
      sortable: true,
      right: true,
      width: "12%",
      cell: (row) => {
        const date = new Date(row.employee_startDate);
        return date.toLocaleDateString("en-GB");
      },
    },
  ];
  // function filterDataTable(event) {
  //   const newData = data.filter(row => {
  //     return
  //     (row.firstname.toLowerCase().includes(event.target.value.toLowerCase()));
  //   })
  //   setFilterData(newData)
  // }

  // const [filterData,setFilterData] = useState(data);
  const reversedColumns = [...columns].reverse();
  const [selectJobType, setSelectJobType] = useState(null);

  const jobType = [
    { name: "עובד חברה", code: "A" },
    { name: "עובד כוח אדם", code: "B" },
  ];

  return (
    <div id="mainBodyTeam">
      <div id="headerTeam">
        <button onClick={() => setButtonPopUp(true)} className="buttonTeam">
          הוספת עובד חדש
        </button>
        <h1>צוות עובדים</h1>
      </div>

      <div id="innerMainTeam">
        <TeamPopUp trigger={buttonPopUp} setTrigger={setButtonPopUp} />

        <div className="JobInfo">
          <div className="headerInnerInfo">
            <Box width="150px">
              <TextField label="סטטוס עובד" select fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>עובד פעיל</MenuItem>
                <MenuItem value={2}>עובד לא פעיל</MenuItem>
              </TextField>
            </Box>

            <Box width="150px">
              <TextField label="סוג עובד" select fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>עובד חברה</MenuItem>
                <MenuItem value={2}>עובד כוח אדם </MenuItem>
              </TextField>
            </Box>

            <TextField label="שם עובד" />
          </div>

          <div className="TeamTable">
            <DataTable
              columns={reversedColumns}
              data={employees}
              fixedHeader
              className="dataTableTeam"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Team;
