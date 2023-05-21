import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataTable from "react-data-table-component";
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const urlGetInventories =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/inventoryItems/get?timestamp=" +
  Date.now();
const urlGetCustomers =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/customers/get";
const username = "cgroup96";
const password = "your_password";

const headers = new Headers();
headers.append("Authorization", "Basic" + btoa(username + ":" + password));

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("he-IL", options);
};

const NewCalendarEvent = ({
  trigger,
  setTrigger,
  addEvent,
  date,
  onSave,
  children,
}) => {
  const [event_name, setEventName] = useState("");
  const [event_date, setEventDate] = useState("");
  const [event_startdate, setEventStartDate] = useState("");
  const [event_enddate, setEventEndDate] = useState("");
  const [event_address, setEventAddress] = useState("");
  const [event_notes, setEventNotes] = useState("");
  const [customerChoose, setCustomerChoose] = useState("");
  const [itemsEvent, setItemsEvent] = useState([]);
  const [lastEventSerial, setLastEventSerial] = useState(6);
  const [dataInfoCustomers, setDataInfoCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dataInfoInventories, setDataInfoInventories] = useState([]);

  const [checkedInventories, setcheckedInventories] = useState(false);
  const [inputValueInventories, setInputValueInventories] = useState("0");

  const [currentStep, setCurrentStep] = useState(1);

  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState("");
  const [step3Data, setStep3Data] = useState([]);

  useEffect(() => {
    fetch(urlGetCustomers, {
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
        console.log("fetch customer = ", result);
        const updatedDatainfo = result.map((st) => {
          return {
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
      .catch((error) => {
        console.log("Err post = ", error);
      });
  }, []);
  useEffect(() => {
    fetch(urlGetInventories, {
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
        console.log("fetch inventoryItems= ", result);
        result.map((st) => console.log(st.itemAmount));
        const updatedDatainfo = result.map((st) => {
          return {
            itemSerialNum: st.itemSerialNum,
            itemName: st.itemName,
            itemAmount: st.itemAmount,
          };
        });
        console.log(updatedDatainfo);
        setDataInfoInventories(updatedDatainfo);
      })
      .catch((error) => {
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
  const eventDateInput = (e) => {
    setEventDate(e.target.value);
    console.log(" Date : " + e.target.value);
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
    setcheckedInventories(e.target.checked);
    if (!e.target.checked) {
      setInputValueInventories("");
    }
  };
  const handleInputInventoriesChange = (e) => {
    setInputValueInventories(e.target.value);
  };

  /*Data for Step2 & Step 3 */
  const columnsCustomers = [
    {
      name: "שם חברה",
      selector: "costumerName",
      sortable: true,
      right: true,
      width: "30%",
    },
    {
      name: "פרטי איש קשר",
      selector: "costumerRepresentitvePhone",
      right: true,
      width: "60%",
      cell: (row) => (
        <div>
          <div>
            {row.costumerRepresentitveName} {row.costumerRepresentitveSurName}
          </div>
        </div>
      ),
    },
  ];
  const reversedColumnsCustomer = [...columnsCustomers].reverse();

  const columnsInventories = [
    {
      name: "",
      selector: "checkcCostumer",
      sortable: false,
      right: true,
      width: "5%",
      cell: (row) => (
        <input
          type="checkbox"
          onChange={handleCheckboxInventoriesChange}
        />
      ),
    },
    {
      name: "שם המוצר",
      selector: "itemName",
      sortable: true,
      right: true,
      width: "40%",
    },
    {
      name: "כמות",
      selector: "selectAmount",
      center: true,
      width: "25%",
      cell: (row) => (
        <input
          type="number"
          min={0}
          className="textInputAmount"
          onChange={handleInputInventoriesChange}
        />
      ),
    },
  ];
  const reversedColumnsInventories = [...columnsInventories].reverse();
  const handleRowSelectedCostumers = (rows) => {
    console.log("Selected Rows:", rows);
  };
  const conditionalRowStylesCustomers = [
    {
      when: (row) => row.isSelected,
      style: {
        backgroundColor: "rgba(0, 123, 255, 0.2)",
      },
    },
  ];

  const handleStep1Next = (e) => {
    e.preventDefault();
    const step1Data = {
      eventSerialNum: lastEventSerial,
      event_name,
      event_startdate,
      event_enddate,
      event_address,
      event_notes,
    };
    setStep1Data(step1Data);
    setCurrentStep((prevStep) => prevStep + 1);
    console.log("Step One Data :" + step1Data);
  };
  const handleStep2Next = () => {
    const step2Data = {
      customerChoose,
    };
    setStep2Data(step2Data);
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleStep3Submit = () => {
    setLastEventSerial((prevSerial) => prevSerial + 1);
    const newEventSerial = lastEventSerial + 1;

    setStep3Data(itemsEvent);

    const formEventData = {
      step1Data: { ...step1Data, eventSerialNum: newEventSerial },
      step2Data,
      step3Data,
    };
    addEvent(step1Data);
    setTrigger(false);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const closeForm = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div className="popUpEvents">
      <div className="innerPopUp">
        <div className="headerInnerPopUp">
          <HighlightOffIcon onClick={closeForm} />
        </div>

        <div className="innerEvents3">
          {currentStep === 1 && (
            <form onSubmit={handleStep1Next}>
              <div className="Step1Main">
                <div className="vehiclesInnerPopUp">
                  <div className="headerInnerPopUp">
                    <h1>יצירת אירוע חדש</h1>
                  </div>
                  <div className="login__control">
                    <label> שם האירוע</label>
                    <input
                      required
                      type="text"
                      value={event_name}
                      onChange={eventNameInput}
                      placeholder="שם אירוע"
                    />
                  </div>

                  <div className="login__control">
                    <label> תאריך אירוע</label>
                    <input
                      required
                      id="time-input"
                      type="date"
                      value={event_date}
                      onChange={eventDateInput}
                    />
                  </div>

                  <div className="login__control">
                    <label> זמן תחילת אירוע</label>
                    <input
                      required
                      id="time-input"
                      type="time"
                      value={event_startdate}
                      onChange={eventStartDateInput}
                      placeholder="זמן תחילת אירוע"
                    />
                  </div>

                  <div className="login__control">
                    <label> זמן סיום אירוע</label>
                    <input
                      required
                      type="time"
                      value={event_enddate}
                      onChange={eventEndDateInput}
                      placeholder="זמן סיום אירוע"
                    />
                  </div>

                  <div className="login__control">
                    <label> את כתובת האירוע</label>
                    <input
                      required
                      type="text"
                      value={event_address}
                      onChange={eventAddressInput}
                      placeholder="כתובת אירוע"
                    />
                  </div>

                  <div className="login__control">
                    <label>הערות </label>
                    <input
                      required
                      type="text"
                      value={event_notes}
                      onChange={eventNotesInput}
                      placeholder="הערות"
                    />
                  </div>
                </div>
              </div>

              <div className="Step1Bottum">
                <ArrowBackIcon type="submit" onClick={handleStep1Next} />
              </div>
            </form>
          )}
          {currentStep === 2 && (
            <>
              <div className="Step2Main">
                <div className="headerInnerPopUp">
                  <h1>בחירת לקוח</h1>
                </div>
                <div className="login__control">
                  <DataTable
                    id="dataTableCustomers"
                    columns={columnsCustomers}
                    data={dataInfoCustomers}
                    selectableRows
                    selectableRowsSingle
                    selectableRowSelected={selectedCustomer}
                    onSelectedRowsChange={({ selectedRows }) => {
                      if (selectedRows.length > 0) {
                        setSelectedCustomer(selectedRows[0].id);
                      } else {
                        setSelectedCustomer(null);
                      }
                    }}
                    fixedHeader
                  />
                </div>
              </div>

              <div className="Step2Bottum">
                <ArrowBackIcon onClick={handleStep2Next} />
                <ArrowForwardIcon onClick={handlePrevious} />
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="Step3Main">
                <div className="headerInnerPopUp">
                  <h1>הוספת פריטים לאירוע</h1>
                </div>

                <div className="vehiclesInnerPopUp">
                  <DataTable
                    columns={reversedColumnsInventories}
                    data={dataInfoInventories}
                    fixedHeader
                    className="dataTableCustomers"
                  />
                </div>
              </div>

              <div className="Step3Bottum">
                <button
                  className="buttonMainPage"
                  type="button"
                  onClick={handleStep3Submit}
                >
                  שמירה
                </button>
                <ArrowForwardIcon onClick={handlePrevious} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default NewCalendarEvent;
