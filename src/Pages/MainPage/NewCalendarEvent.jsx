import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataTable from "react-data-table-component";
import "./MainPageCss.css";
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const urlGetInventories = 'https://proj.ruppin.ac.il/cgroup96/prod/api/inventoryItems/get?timestamp=' + Date.now();
const urlGetCustomers = 'https://proj.ruppin.ac.il/cgroup96/prod/api/customers/get';
const username = 'cgroup96';
const password = 'your_password';

const headers = new Headers();
headers.append('Authorization','Basic' + btoa(username + ":" + password));

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("he-IL", options);
};

const NewCalendarEvent = ({trigger, setTrigger, addEvent, date, onSave, children}) => {

  const [eventName,setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventNotes, setEventNotes ] = useState("");
  const [employeeId,setEmployeeId] = useState("");
  const [clientNumber, setClientNumber] = useState(null);
  const [itemListEvent,setItemListEvent] = useState([]);

  const [lastEventSerial, setLastEventSerial] = useState(14);

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [dataInfoCustomers, setDataInfoCustomers] = useState([]);
  const [dataInfoInventories, setDataInfoInventories] = useState([]);

  
  useEffect(() => {
    fetch(urlGetCustomers, {
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
      console.log("fetch customer = ", result);
      const updatedDatainfo = result.map(st => {
        return{
          costumerNum: st.clientNumber,
          costumerName: st.clientName,
          costumerRepresentitveName: st.clientFirstName,
          costumerRepresentitveSurName: st.clientLastName,
          costumerRepresentitvePhone: st.clientPhoneNum,
          costumerRepresentitveEmail: st.representiveEmail,
        };
    });
    console.log(updatedDatainfo);
    setDataInfoCustomers(updatedDatainfo);
  })
  .catch(error => {
    console.log("Err post = ", error);
  });
  },[]);
  useEffect(() => {
    fetch(urlGetInventories, {
      method: 'GET',
      headers: headers
    })
    .then(res => {
      console.log('res=', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then( result => {
      console.log("fetch inventoryItems= ", result);
      const updatedDatainfo = result.map(st => {
        return{
          itemSerialNum: st.itemSerialNum,
          itemName: st.itemName,
          itemAmount: st.itemAmount,
        };
      });
      console.log(updatedDatainfo);
      setDataInfoInventories(updatedDatainfo);
    })
    .catch(error => {
      console.log("err post = ", error);
    });
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState('');
  const [step3Data, setStep3Data] = useState([]);

  const eventNameInput = (e) => {
    setEventName(e.target.value);
    console.log("Name : " + e.target.value);
  };
  const eventAddressInput = (e) => {
    setEventAddress(e.target.value);
    console.log("Address : " + e.target.value);
  };
  const eventStartDateInput = (e) => {
    setEventStartDate(e.target.value);
    console.log("Start Date : " + e.target.value);
  };
  const eventEndDateInput = (e) => {
    setEventEndDate(e.target.value);
    console.log("End Date : " + e.target.value);
  };
  const eventNotesInput = (e) => {
    setEventNotes(e.target.value);
    console.log("Notes : " + e.target.value);
  };
  const employeeIdInput = (e) => {
    setEmployeeId(e.target.value);
    console.log("Employee Id : " + e.target.value);
  };
  const clientNumberInput = (e) => {
    setClientNumber(e.target.value);
    console.log("Client Event : " + e.target.value);
  };


/*Data for Step2 & Step 3 */
  const columnsCustomers = [
    {
      name: "מספר לקוח",
      selector: "costumerNum",
      width: "0%"
    },
    {
      name : "שם חברה",
      selector : "costumerName",
      sortable: true,
      width: '35%',
    },
    {
      name : "פרטי איש קשר",
      selector : "costumerRepresentitvePhone",
      width: '50%',
      cell: (row) => (
        <div className="costumerInfo">
          <div>
            {row.costumerRepresentitveName}{" "}
            {row.costumerRepresentitveSurName}
          </div>
          <div>{row.costumerRepresentitvePhone}</div>
          <div>{row.costumerRepresentitveEmail}</div>
        </div>
      ),
    },
  ]
  const columnsInventories = [
    {
      width: "2%"
    },
    {
      name: "מסד",
      selector: "itemSerialNum",
      sortable: true,
      width: "13%",
      rigth: true,
    },
    {
      name: "שם המוצר",
      selector: "itemName",
      sortable: true,
      width: "40%",
      style: ("padding: 5px")
    },
    {
      name: "כמות זמינה",
      selector: "itemAmount",
      width: "30%",
      center: true,
    },
    {
      name: "כמות",
      selector: "selectAmount",
      center: true,
      width: "15%",
      cell: ((row) => 
        <input type="text"
               className="textInputAmount"
               onChange={(e) => amountInventoryChange(row.itemSerialNum, e.target.value)}/>),
    },
  ]


  
  const resetTextHandler = () => {
    setEventName("");
    setEventAddress("");
    setEventStartDate("");
    setEventEndDate("");
    setEventNotes("");
    setEmployeeId("");
    setClientNumber("");
  };
  const amountInventoryChange = (serialNum , value) => {
    if (value){
      console.log(serialNum + " " + value);
      const existingItemIndex = itemListEvent.find(
        (item) => item.itemSerialNum === serialNum
      );
      if (existingItemIndex) {
        const updatedItems = itemListEvent.map((item) =>
        item.itemSerialNum === serialNum ? {...item , value }: item
        );
        setItemListEvent(updatedItems);
        console.log("item updated");
      } 
      else {
        const newItem = { itemSerialNum: serialNum, value };
        setItemListEvent([...itemListEvent, newItem]);
        console.log("item updated");
      }
      console.log(itemListEvent);
    }
  };

  useEffect(() => {
    console.log(selectedCustomer);
  }, [selectedCustomer]);





  const handleStep1Next = () => {
      const step1Data = {
        eventSerialNumber: lastEventSerial,
        eventName,
        eventAddress,
        eventStartDate,
        eventEndDate,
        eventNotes,
      };
    setStep1Data(step1Data);
    setCurrentStep(prevStep => prevStep + 1);
  };
  const handleStep2Next = () => {
    const step2Data = {
      selectedCustomer,
    };
    setStep2Data(step2Data);
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleStep3Submit = () => {

    setLastEventSerial(lastEventSerial => lastEventSerial + 1);
    const newEventSerial = lastEventSerial + 1;

    const itemsToSave = itemListEvent.map((item) => ({
      itemSerialNum: item.itemSerialNum,
      itemAmount: item.selectAmount,
    }));
    console.log(itemsToSave);

    const formEventData = {
      eventSerialNum: newEventSerial,
      event_name: step1Data.eventName,
      event_address: step1Data.eventAddress,
      event_startdate: step1Data.eventStartDate,
      event_enddate: step1Data.eventEndDate,
      event_notes: step1Data.eventNotes,
      clientNumber: step2Data.clientNumber,
      ItemAllocations: itemsToSave,
    };
    addEvent(formEventData);
    resetTextHandler();
    setCurrentStep(1);
    setTrigger(false);
  };

  const handlePrevious = () => {
      setCurrentStep(prevStep => prevStep - 1);
  };
  const closeForm = () => {
    resetTextHandler();
    setCurrentStep(1);
    setTrigger(false);
  };

  return trigger ? (
    <div className="popUpEvents">
      <div className="innerPopUpEvents">

          <div className="innerEvents1">
            <HighlightOffIcon className="closeBTN" onClick={closeForm} />
          </div>
          <div className="innerEvents2">
            <h1>יצירת אירוע חדש</h1>
          </div>

          <div className="innerEvents3">
          {currentStep === 1 && (
            <>
              <div className="Step1Main">
                <div className="Step1MainInner1">
                  <h1>אנא מלא את פרטי האירוע</h1>
                </div>
                <div className="Step1MainInner2">

                  <div className="divInfoInput">
                    <input id=""
                           type="text"
                           value={eventName}
                           onChange={eventNameInput}/>
                    <span>שם אירוע</span>
                  </div>

                  
                  <div className="divInfoInput">
                    <input
                      id="time-input"
                      type="time"
                      value={eventStartDate}
                      onChange={eventStartDateInput}/>
                      <span>זמן תחילת אירוע</span>
                  </div>

                  <div className="divInfoInput">
                    <input
                      id=""
                      type="time"
                      value={eventEndDate}
                      onChange={eventEndDateInput}/>
                      <span>זמן סיום אירוע</span>
                  </div>

                  <div className="divInfoInput">
                    <input
                      id=""
                      type="text"
                      value={eventAddress}
                      onChange={eventAddressInput}/>
                    <span>כתובת אירוע</span>
                  </div>

                  <div className="divInfoInput">
                    <input
                      id=""
                      type="text"
                      value={eventNotes}
                      onChange={eventNotesInput}/>
                    <span>הערות</span>
                  </div>
                  
                </div>
              </div>
              <div className="Step1Bottum">
                <ArrowBackIcon onClick={handleStep1Next}/>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="Step2Main">
                <div className="Step2MainInner1">
                  <h1>אנא בחר את לקוח האירוע</h1>
                </div>
                <div className="Step2MainInner2">
                  <DataTable id="dataTableCustomers"
                             columns={columnsCustomers}
                             data={dataInfoCustomers}
                             selectableRows
                             selectableRowsSingle
                             onSelectedRowsChange={({ selectedRows }) => {
                              if (selectedRows.length > 0) {
                                setSelectedCustomer(selectedRows[0].costumerNum);
                              } else {
                                setSelectedCustomer(null);
                              }}}
                             fixedHeader
                             direction="rtl"/>
                </div>
              </div>
              <div className="Step2Bottum">
                <ArrowBackIcon onClick={handleStep2Next}/>
                <ArrowForwardIcon onClick={handlePrevious}/>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
            <div className="Step3Main">
              <div className="Step3MainInner1">
                <h1>אנא בחר מוצר/ים וכמות</h1>
              </div>
              <div className="Step3MainInner2">
                <DataTable columns={columnsInventories}
                           data={dataInfoInventories}
                           direction="rtl"
                           fixedHeader
                           className="dataTableCustomers"/>
              </div>
            </div>
            <div className="Step3Bottum">
              <Button type="button" onClick={handleStep3Submit}>שמירה</Button>
              <ArrowForwardIcon onClick={handlePrevious}/>
            </div>
            </>
          )}
          </div>
      </div>
    </div>
  ) : ("");
};

export default NewCalendarEvent;




