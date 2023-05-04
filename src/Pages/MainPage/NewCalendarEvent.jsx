import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataTable from "react-data-table-component";
import DatePicker from 'react-datepicker';
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

  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventNotes, setEventNotes ] = useState("");
  const [customerChoose, setCustomerChoose] = useState("");
  const [itemsEvent, setItemsEvent ] = useState([]);

  const [dataInfoCustomers, setDataInfoCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dataInfoInventories, setDataInfoInventories] = useState([]);


  const [checkedInventories, setcheckedInventories] = useState(false);
  const [inputValueInventories, setInputValueInventories] = useState('');


  const [currentStep, setCurrentStep] = useState(1);

  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState('');
  const [step3Data, setStep3Data] = useState([]);

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
      result.map(st => console.log(st.itemAmount));
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


  const eventNameInput = (e) => {
    setEventName(e.target.value);
    console.log("Name : " + e.target.value);

  };
  const eventStartDateInput = (e) => {
    setEventStartDate(e.target.value);
    console.log("Start Date : " + e.target.value);
  };
  const eventEndDateInput = (e) => {
    setEventEndDate(e.target.value);
    console.log("End Date : " + e.target.value);
  };
  const eventAddressInput = (e) => {
    setEventAddress(e.target.value);
    console.log("Address : " + e.target.value);
  };
  const eventNotesInput = (e) => {
    setEventNotes(e.target.value);
    console.log("Notes : " + e.target.value);
  };
  const customerChooseInput = (e) => {
    setCustomerChoose(e.target.value);
    console.log("Customer Event : " + e.target.value);
  };
  const itemsEventInput = (e) => {
    setItemsEvent(e.target.value);
    console.log("Item List : " + e.target.value);
  };
  const handleCustomerSelection = (customerId) => {
    setSelectedCustomer(customerId);
  };

  
  const handleCheckboxInventoriesChange = (e) => {
    setcheckedInventories(e.target.checkedInventories);
    if (!e.target.checkedInventories) {
      setInputValueInventories('');
    }
  };
  const handleInputInventoriesChange = (e) => {
    setInputValueInventories(e.target.value);
  };


/*Data for Step2 & Step 3 */
  const columnsCustomers = [
    /*{
      name : "",
      selector : "checkcCostumer",
      sortable: false,
      right: true,
      width: '10%',
      cell: ((row) =>
       <input type="checkbox"
              checked={selectedCustomer === row.id}
              onChange={() => handleCustomerSelection(row.id)}/>),
    },*/
    {
      name : "שם חברה",
      selector : "costumerName",
      sortable: true,
      right: true,
      width: '30%',
    },
    {
      name : "פרטי איש קשר",
      selector : "costumerRepresentitvePhone",
      right: true,
      width: '60%',
      cell: (row) => (
        <div>
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
  const reversedColumnsCustomer = [...columnsCustomers].reverse();

  const columnsInventories =[
    {
      name : "",
      selector : "checkcCostumer",
      sortable: false,
      right: true,
      width: '5%',
      cell: ((row) =>
       <input type="checkbox"
              checked={checkedInventories}
              onchange={handleCheckboxInventoriesChange}/>),
    },
    {
      name: "מסד",
      selector: "itemSerialNum",
      sortable: true,
      center: true,
      width: '25%',
    },
    {
      name: "שם המוצר",
      selector: "itemName",
      sortable: true,
      right: true,
      width: '40%',
    },
    {
      name: "כמות",
      selector: "selectAmount",
      center: true,
      width: '25%',
      cell: ((row) => 
        <input type="text"
               className="textInputAmount"
               value={inputValueInventories}
               onChange={handleInputInventoriesChange}
               disabled={!checkedInventories}/>),
    },
  ]
  const reversedColumnsInventories = [...columnsInventories].reverse();







  const handleRowSelectedCostumers = (rows) => {
    console.log('Selected Rows:', rows);
  };
  const conditionalRowStylesCustomers = [
    {
      when: (row) => row.isSelected,
      style: {
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    },
  ];





  const handleStep1Next = () => {
      const step1Data = {
        eventName,
        eventStartDate,
        eventEndDate,
        eventAddress,
        eventNotes,
      };
    setStep1Data(step1Data);
    setCurrentStep(prevStep => prevStep + 1);
  };
  const handleStep2Next = () => {
    const step2Data = {
      customerChoose,
    };
    setStep2Data(step2Data);
    setCurrentStep(prevStep => prevStep + 1);
  };
  const handleStep3Submit = () => {

    setStep3Data(itemsEvent);

    const formEventData = {
      step1Data,
      step2Data,
      step3Data,
    };
    addEvent(formEventData);
    setTrigger(false);
  };




  const handleNext = () => {
      setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrevious = () => {
      setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSave = (e) => {
    e.preventDefault();
      const newEvents = {
        event_name: title,
        event_startdate: time,
        event_address: place,
      };
      console.log("*************************");
      console.log(newEvents);
      addEvent(newEvents);
      setTrigger(false);
  };
  const closeForm = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div className="popUpEvents">
      <div className="innerPopUpEvents">

          <div className="innerEvents1">
            <HighlightOffIcon onClick={closeForm} />
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
                    <label>נא הכנס את שם האירוע</label>
                    <input id=""
                           type="text"
                           value={eventName}
                           onChange={eventNameInput}
                           placeholder="שם אירוע"
                           />
                  </div>

                  <div className="divInfoInput">
                  <label>נא הכנס זמן תחילת אירוע</label>
                    <input
                      id="time-input"
                      type="time"
                      value={eventStartDate}
                      onChange={eventStartDateInput}
                      placeholder="זמן תחילת אירוע"
                    />
                  </div>

                  <div className="divInfoInput">
                  <label>נא הכנס זמן סיום אירוע</label>
                    <input
                      id=""
                      type="time"
                      value={eventEndDate}
                      onChange={eventEndDateInput}
                      placeholder="זמן סיום אירוע"
                    />
                  </div>

                  <div className="divInfoInput">
                  <label>נא הכנס את כתובת האירוע</label>
                    <input
                      id=""
                      type="text"
                      value={eventAddress}
                      onChange={eventAddressInput}
                      placeholder="כתובת אירוע"
                    />
                  </div>

                  <div className="divInfoInput">
                  <label>הערות אירוע</label>
                    <input
                      id=""
                      type="text"
                      value={eventNotes}
                      onChange={eventNotesInput}
                      placeholder="הערות"
                    />
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
                             selectableRowSelected={selectedCustomer}
                             onSelectedRowsChange={({selectedRows}) => {
                                if (selectedRows.length > 0){setSelectedCustomer(selectedRows[0].id);}
                                else {setSelectedCustomer(null)};}}
                             fixedHeader/>
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
                <DataTable columns={reversedColumnsInventories}
                           data={dataInfoInventories}
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