import React, { useState , useEffect , useCallback }  from "react";
import "./InventoriesCss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import InventoriePopUp from "./InventoryPopUp";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateInventoryPopUp from "./UpdateInventoryPopUp"


const url = 'https://proj.ruppin.ac.il/cgroup96/prod/api/inventoryItems/get?timestamp=' + Date.now();

const urlpost='https://proj.ruppin.ac.il/cgroup96/prod/api/inventoryItems/post';
const urldelete='https://proj.ruppin.ac.il/cgroup96/prod/api/inventoryItems/delete'
const username = 'cgroup96';
const password = 'your_password';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

function addInventoryItem(item,refreshData) {
  fetch(urlpost, {
    method: 'POST',
    headers: {
      ...headers, // Spread the existing headers
      'Content-Type': 'application/json' // Add the 'Content-Type' header
    },
    body: JSON.stringify(item)
  })
    .then(res => {
      console.log('res=', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then(result => {
      console.log("add inventory item result= ", result);
      refreshData();
    })
    .catch(error => {
      console.log("err post=", error);
    });
}

function Inventories() {
  const [datainfo, setDatainfo] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const refreshData = useCallback(() => setDataUpdated(!dataUpdated), [dataUpdated]);


  function deleteInventoryItem(itemId) {
    fetch(urldelete, {
      method: 'DELETE',
      headers: {
        ...headers, // Spread the existing headers
        'Content-Type': 'application/json' // Add the 'Content-Type' header
      },
      body: JSON.stringify({itemSerialNum: itemId })
    })
      .then(res => {
        console.log('item id is:',itemId);
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(result => {
        console.log("delete inventory item result= ", result);
        // Refresh data after deleting item
        refreshData();
      })
      .catch(error => {
        console.log("err delete=", error);
      });
      
  }

  function updateInventoryItem(itemId, updatedItem) {
    const urlUpdate = `https://proj.ruppin.ac.il/cgroup96/prod/api/inventoryItems/put`;
  
    fetch(urlUpdate, {
      method: 'PUT',
      headers: {
        ...headers, // Spread the existing headers
        'Content-Type': 'application/json' // Add the 'Content-Type' header
      },
      body: JSON.stringify({ ...updatedItem, itemSerialNum: itemId })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(result => {
        console.log("update inventory item result= ", result);
        refreshData();
      })
      .catch(error => {
        console.log("err update=", error);
      });
  }
  



  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(result => {
        console.log("fetch inventoryItems= ", result);
        result.map(st => console.log(st.itemAmount));
        const updatedDatainfo = result.map(st => {
          return {
            setting: <button>עריכה</button>,
            itemSerialNum: st.itemSerialNum,
            itemName: st.itemName,
            itemAmount: st.itemAmount,
            itemDescription: st.itemDescription,
            id: st.employee_id,
            itemPicture: st.itemPicture
          };
        });
        console.log(updatedDatainfo);
        setDatainfo(updatedDatainfo);
      })
      .catch(error => {
        console.log("err post=", error);
      });
  }, [dataUpdated]); // Add empty dependency array to run effect only once

  const columns = [
    {
      name: "מחיקה",
      selector: "delete",
      center: true,
      width:"7%",
      cell: (row) => <DeleteIcon onClick={() => deleteInventoryItem(row.itemSerialNum)}>מחיקת פריט</DeleteIcon>,
    },
    {
      name: "עדכון",
      selector: "setting",
      center: true,
      width:"6%",
      cell: (row) => (
        <EditIcon
          onClick={() => {
            setShowEditPopup(true);
            setCurrentItem(row);
          }}
        >
          עדכון פריט
        </EditIcon>
      ),
    },
    {
      name: "תמונת פריט",
      selector: "itemPicture",
      sortable: true,
      right: true,
      width:"14%",
    },
    {
      name:"תיאור פריט",
      selector: "itemDescription",
      sortable: true,
      right: true,
      width:"30%",
    },
    {
      name: " כמות",
      selector: "itemAmount",
      sortable: true,
      right: true,
      width:"10%",
    },
    {
      name: "תז עובד",
      selector: "id",
      sortable: true,
      right: true,
      width:"10%",
    },
    {
      name: "שם המוצר",
      selector: "itemName",
      sortable: true,
      right: true,
      width:"15%",
    },
    {
      name: "מסד",
      selector: "itemSerialNum",
      sortable: true,
      width:"8%",
      center: true,
    },];


  return (
    <div id="mainBodyInventories">

      <div id="headerInventories">
        <button onClick={() => setButtonPopUp(true)} className="buttonInventories">
          הוספת פריט מלאי 
        </button>
        <h1>מלאי</h1>
      </div>


      <div id="innerMainInventories">
        <InventoriePopUp trigger={buttonPopUp}
                         setTrigger={setButtonPopUp}
                         addInventoryItem={(item) => addInventoryItem(item, refreshData)}/>
        <UpdateInventoryPopUp
                         trigger={showEditPopup}
                         setTrigger={setShowEditPopup}
                         onUpdateInventoryItem={updateInventoryItem}
                         currentItem={currentItem}/>
        
        <DataTable columns={columns}
                   data={datainfo}
                   fixedHeader/>
      </div>

      

    </div>
  );
};

export default Inventories;