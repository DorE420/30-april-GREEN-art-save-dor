import React, { useState, useEffect, useCallback } from "react";
import "./VehiclesCss.css";
import VehiclesPopUp from "./VehiclesPopUp";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BuildIcon from "@mui/icons-material/Build";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewVehicleMaintenance from "./NewVehicleMaintenance";
import EditVehiclePopUp from "./EditVehiclePopUp";
import DeletePopup from "./DeletePopup";

const url =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleList/get?timestamp=" +
  Date.now();

const urlpost = "https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleList/post";
const urldelete =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleList/delete";
const username = "cgroup96";
const password = "your_password";
const urlmaintencepost =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleAdd/post";
const urlputvehicle =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleList/put";
const headers = new Headers();
headers.append("Authorization", "Basic " + btoa(username + ":" + password));

const Vehicles = () => {
  const [datainfo, setDatainfo] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [licenseNumToDelete, setLicenseNumToDelete] = useState(null);
  const [maintenancePopUp, setMaintenancePopUp] = useState(false);
  const [updateVehicleVisible, setUpdateVehicleVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const refreshData = useCallback(
    () => setDataUpdated(!dataUpdated),
    [dataUpdated]
  );
  const closeUpdateVehiclePopup = () => {
    setSelectedVehicle(null);
    setUpdateVehicleVisible(false);
  };
  function addMaintenanceItem(item, refreshData) {
    fetch(urlmaintencepost, {
      method: "POST",
      headers: {
        ...headers, // Spread the existing headers
        "Content-Type": "application/json", // Add the 'Content-Type' header
      },
      body: JSON.stringify(item),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("result= ", result);
        refreshData();
      })
      .catch((error) => {
        console.log("err post=", error);
      });
  }

  function deleteMaintenance(maintenanceId) {
    const deletemainturl =
      "https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleMaintence/delete";
    fetch(deletemainturl, {
      method: "DELETE",
      headers: {
        ...headers, // Spread the existing headers
        "Content-Type": "application/json", // Add the 'Content-Type' header
      },
      body: JSON.stringify({ maintenance_id: maintenanceId }),
    })
      .then((res) => {
        console.log(maintenanceId);
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("**************");
        console.log("delete maintenance result= ", result);
        console.log("**************");
        // Refresh data after deleting item
        refreshData();
        fetchMaintenanceData(licenseNumToDelete);
      })
      .catch((error) => {
        console.log("err delete=", error);
      });
  }

  function showDeleteConfirmation(licenseNum) {
    setLicenseNumToDelete(licenseNum);
    setShowDeleteConfirm(true);
  }

  function addVehiclesItem(item, refreshData) {
    fetch(urlpost, {
      method: "POST",
      headers: {
        ...headers, // Spread the existing headers
        "Content-Type": "application/json", // Add the 'Content-Type' header
      },
      body: JSON.stringify(item),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("result= ", result);
        refreshData();
      })
      .catch((error) => {
        console.log("err post=", error);
      });
  }

  function updateVehiclesItem(item, refreshData) {
    fetch(urlputvehicle, {
      method: "PUT",
      headers: {
        ...headers, // Spread the existing headers
        "Content-Type": "application/json", // Add the 'Content-Type' header
      },
      body: JSON.stringify(item),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("result= ", result);
        refreshData();
      })
      .catch((error) => {
        console.log("err post=", error);
      });
  }
  const openEditPopup = (vehicle) => {
    console.log("open Edit Vehicle Popup called for: ", vehicle);
    setSelectedVehicle(vehicle);
    setUpdateVehicleVisible(true);
  };

  function deleteVehicle(itemId) {
    fetch(urldelete, {
      method: "DELETE",
      headers: {
        ...headers, // Spread the existing headers
        "Content-Type": "application/json", // Add the 'Content-Type' header
      },
      body: JSON.stringify({ licensePlateNum: itemId }),
    })
      .then((res) => {
        console.log("item id is:", itemId);
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("**************");
        console.log("delete vehicle result= ", result);
        console.log("**************");
        // Refresh data after deleting item
        refreshData();
      })
      .catch((error) => {
        console.log("err delete=", error);
      });
  }
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("fetch Vehicles = ", result);
        const updatedDatainfo = result.map((st) => {
          return {
            setting: <button>עריכה</button>,
            licenseNum: st.licensePlateNum,
            vehicleType1: st.vehicleType,
            vehicleColor1: st.vehicleColor,
            vehicleOwnership1: st.vehicleOwnership,
            manufacturingYear1: st.manufacturingYear,
            key: st.licensePlateNum,
          };
        });
        console.log(updatedDatainfo);
        setDatainfo(updatedDatainfo);
      })
      .catch((error) => {
        console.log("err post=", error);
      });
  }, [dataUpdated]);

  const columnsLeftData = [
    {
      name: "תאריך ושעה",
      selector: "DateandTime",
      right: true,
      sortable: true,
      width: "25%",
    },
    {
      name: "שם המוסך",
      selector: "GarageName",
      right: true,
      sortable: true,
      width: "25%",
    },
    {
      name: "סוג טיפול",
      selector: "maintanceName",
      right: true,
      sortable: true,
      width: "25%",
    },
    {
      name: "",
      selector: "Setting",
      center: true,
      width: "10%",
      cell: (row) => (
        <div>
          <Menu className="menuListRow">
            <MenuHandler>
              <MoreVertIcon />
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => deleteMaintenance(row.maintID)}>
                <DeleteIcon />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ),
    },
  ];
  const reversedColumns = [...columnsLeftData].reverse();

  function fetchMaintenanceData(licenseNum) {
    const maintenanceUrl = `https://proj.ruppin.ac.il/cgroup96/prod/api/vehicleMaintenance/add`;

    fetch(maintenanceUrl, {
      method: "POST",
      headers: {
        ...headers, // Spread the existing headers
        "Content-Type": "application/json", // Add the 'Content-Type' header
      },
      body: JSON.stringify({ vehicle_id: licenseNum }),
    })
      .then((res) => {
        console.log(licenseNum);
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("Fetched Maintenance Data =", result);
        const updatedMaintenanceData = result.map((item) => {
          return {
            maintID: item.maintenance_id,
            DateandTime: item.maintenance_date,
            GarageName: item.garageName,
            maintanceName: item.maintenance_description,
            Setting: <button>עריכה</button>,
          };
        });
        setMaintenanceData(updatedMaintenanceData); // Update the maintenance data in the state
      })
      .catch((error) => console.log("Error fetching maintenance data:", error));
  }

  const columns = [
    {
      name: "היסטורית טיפולים",
      selector: "action",
      sortable: false,
      right: true,
      button: true,
      width: "15%",
      cell: (row) => (
        <div className="iconsDataTable">
          <BuildIcon onClick={() => fetchMaintenanceData(row.licenseNum)} />
        </div>
      ),
    },
    {
      name: "עריכה",
      selector: "action",
      sortable: false,
      right: true,
      button: true,
      width: "5%",
      cell: (row) => (
        <div className="iconsDataTable">
          <EditIcon onClick={() => openEditPopup(row)} />
        </div>
      ),
    },
    {
      name: "מחיקה",
      selector: "action",
      sortable: false,
      right: true,
      button: true,
      width: "5%",
      cell: (row) => (
        <div className="iconsDataTable">
          <DeleteIcon onClick={() => showDeleteConfirmation(row.licenseNum)} />
        </div>
      ),
    },
    {
      name: "מספר רישוי",
      selector: "licenseNum",
      sortable: true,
      right: true,
      width: "16%",
    },
    {
      name: " סוג רכב",
      selector: "vehicleType1",
      sortable: true,
      right: true,
      width: "15%",
    },
    {
      name: " בעלות",
      selector: "vehicleOwnership1",
      sortable: true,
      right: true,
      width: "12%",
    },
    {
      name: "צבע",
      selector: "vehicleColor1",
      sortable: true,
      right: true,
      width: "15%",
    },
    {
      name: "שנת יצור",
      selector: "manufacturingYear1",
      sortable: true,
      right: true,
      width: "15%",
    },
  ];

  return (
    <div id="mainBodyVehicles">
      <div id="headerVehicles">
        <button onClick={() => setButtonPopUp(true)} className="buttonVehicles">
          הוספת רכב חדש
        </button>
        <h1>רכבים</h1>
      </div>

      <div id="innerMainVehicles">
        <VehiclesPopUp
          trigger={buttonPopUp}
          setTrigger={setButtonPopUp}
          addVehiclesItem={(item) => addVehiclesItem(item, refreshData)}
        />
        <EditVehiclePopUp
          trigger={updateVehicleVisible}
          setTrigger={setUpdateVehicleVisible}
          vehicle={selectedVehicle}
          visible={updateVehicleVisible}
          onClose={closeUpdateVehiclePopup}
          onUpdate={(item) => updateVehiclesItem(item, refreshData)}
        />

        <DeletePopup
          show={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onDelete={() => {
            deleteVehicle(licenseNumToDelete);
            setShowDeleteConfirm(false);
          }}
        />
        <NewVehicleMaintenance
          trigger={maintenancePopUp}
          setTrigger={setMaintenancePopUp}
          addMaintenanceItem={(item) => addMaintenanceItem(item, refreshData)}
          vehicles={datainfo}
        />

        <div id="vehiclesTable">
          <DataTable
            columns={columns}
            data={datainfo}
            fixedHeader
            className="dataTableVehicles"
          />
        </div>

        <div id="vehiclesInfo">
          <div className="topInfo">
            <div className="innerheaderInfo">
              <EditIcon className="iconBC" />
              <label>פרטי הרכב</label>
            </div>
          </div>
          <div className="bottumInfo">
            <div className="innerheaderInfo">
              <AddCircleIcon
                onClick={() => setMaintenancePopUp(true)}
                className="iconBC"
              />
              <label>טיפולי רכב</label>
            </div>
            <div>
              <DataTable columns={reversedColumns} data={maintenanceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
