import React, { useState, useCallback, useEffect } from "react";
import "./SuppliersCss.css";
import { TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import NewSuppliers from "./NewSuppliers";
import DeleteAlert from "./DeleteAlert";
import EditSupplierPopUp from "./EditSupplier";
import { toast } from "react-toastify";

const url = "https://proj.ruppin.ac.il/cgroup96/prod/api/supplier/get";
const urlUpdate = "https://proj.ruppin.ac.il/cgroup96/prod/api/supplier/update";
const urlPost = "https://proj.ruppin.ac.il/cgroup96/prod/api/supplier/post";
const urlDelete = "https://proj.ruppin.ac.il/cgroup96/prod/api/supplier/delete";
const username = "cgroup96";
const password = "your_password";

const headers = new Headers();
headers.append("Authorization", "Basic " + btoa(username + ":" + password));

const Suppliers = () => {
  const [dataInfo, setDataInfo] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [supplierID, setSupplierID] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [searchText, setSearchText] = useState("");

  const refreshData = useCallback(
    () => setDataUpdated(!dataUpdated),
    [dataUpdated]
  );
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split("/")
      .reverse()
      .join("-");
  };

const updateSupplier = (supplierItem) => {
  fetch(urlUpdate, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplierItem),
  })
    .then((res) => {
      console.log("res=", res);
      console.log("res.status", res.status);
      console.log("res.ok", res.ok);
      return res.json();
    })
    .then((result) => {
      console.log("update supplier result = ", result);
      refreshData();
    })
    .catch((error) => {
      console.log("err put = ", error);
    });
};

  const addSupplier = (supplierItem, refreshData) => {
    fetch(urlPost, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierItem),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("add supplier item result = ", result);
        toast.success("הוספת ספק הושלמה");
        refreshData();
      })
      .catch((error) => {
        console.log("err post = ", error);
      });
  };
  const deleteSuppliers = (supplierID) => {
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ businessNumber: supplierID }),
    })
      .then((res) => {
        console.log("supplier id is :", supplierID);
        console.log("res = ", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("delete supplier result = ", result);
        refreshData();
      })
      .catch((error) => {
        console.log("Err delete=", error);
      });
  };
  function showDeleteConfirmation(supplierID) {
    setSupplierID(supplierID);
    setShowDeleteConfirm(true);
  }
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        console.log("res = ", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("fetch supplier = ", result);
        const updatedDatainfo = result.map((st) => {
          return {
            supplierName: st.repName,
            contactName: st.repLastName,
            businessNumber: st.businessNumber,
            startWorkDate: formatDate(st.StartWorkDate),
            email: st.companyEmail,
            address: st.companyAddress,
          };
        });
        console.log(updatedDatainfo);
        setDataInfo(updatedDatainfo);
      })
      .catch((error) => {
        console.log("err post=", error);
      });
  }, [dataUpdated]);

  const columns = [
    {
      name: "מספר ח.פ",
      selector: (row) => row.businessNumber,
      sortable: true,
      right: true,
    },
    {
      name: "תאריך התקשרות ",
      selector: (row) => row.startWorkDate,
      sortable: true,
      right: true,
    },
    {
      name: "כתובת ספק",
      selector: (row) => row.address,
      sortable: true,
      right: true,
    },
    {
      name: "כתובת מייל",
      selector: (row) => row.email,
      sortable: true,
      right: true,
    },
    {
      name: "פרטי איש קשר",
      // selector: "supplierRepresentitvePhone",
      right: true,
      cell: (row) => (
        <div>
          <div>{row.contactName}</div>
          <div>{row.supplierName}</div>
          <div>{row.email}</div>
        </div>
      ),
    },
    {
      name: "",
      center: true,
      width: "10%",
      cell: (row) => (
        <>
          <div>
            <Menu>
              <MenuHandler>
                <MoreVertIcon />
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <EditIcon
                    onClick={() => {
                      setCurrentSupplier(row);
                      setEditPopup(true);
                    }}
                  />
                </MenuItem>
                <MenuItem>
                  <DeleteIcon
                    onClick={() => showDeleteConfirmation(row.supplierNum)}
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </>
      ),
    },
  ];

  const reversedColumns = [...columns].reverse();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

const filteredData = dataInfo.filter(
  (item) =>
    item.supplierName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.contactName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.startWorkDate.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase()) ||
    item.address.toLowerCase().includes(searchText.toLowerCase()) ||
    (item.businessNumber && item.businessNumber.toString().includes(searchText))
);



  return (
    <div id="mainBodySuppliers">
      <div id="headerSuppliers">
        <button
          className="buttonSuppliers"
          onClick={() => setButtonPopUp(true)}
        >
          הוספת ספק חדש
        </button>
        <h1>ספקים</h1>
      </div>

      <div id="innerMainSuppliers">
        <div id="innerRight">
          <div className="headerInnerRight">
            <TextField
              label="פרטי הספק המבוקש"
              size="small"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div>
            <DeleteAlert
              show={showDeleteConfirm}
              onClose={() => setShowDeleteConfirm(false)}
              onDelete={() => {
                deleteSuppliers(supplierID);
                setShowDeleteConfirm(false);
              }}
            />
            <EditSupplierPopUp
              trigger={editPopup}
              setTrigger={setEditPopup}
              updateSupplier={(supplierItem) => updateSupplier(supplierItem)}
              supplier={currentSupplier}
              refreshData={refreshData}
            />
            <NewSuppliers
              trigger={buttonPopUp}
              setTrigger={setButtonPopUp}
              addSupplier={(item) => addSupplier(item, refreshData)}
            />
          </div>
          <div className="mainInnerRight">
            <DataTable
              columns={reversedColumns}
              data={filteredData}
              fixedHeader
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
