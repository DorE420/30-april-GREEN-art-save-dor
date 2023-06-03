import React, { useState, useEffect, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import NewCalendarEvent from "./NewCalendarEvent";

import "./MainPageCss.css";
import {Menu,MenuHandler,MenuList,MenuItem} from "@material-tailwind/react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DataTable from "react-data-table-component";



const urlGetEvents = "https://proj.ruppin.ac.il/cgroup96/prod/api/GreenEvents/get";
const urlPostEvent = "https://proj.ruppin.ac.il/cgroup96/prod/api/GreenEvents/addwithinv";
const urlDeleteEvent = "https://your-api-url.com/api/events/delete";

const urlGetInventoriesEvent = "https://proj.ruppin.ac.il/cgroup96/prod/api/GreenEvents/GetEventWithItems";

const username = "your_username";
const password = "your_password";

const headers = new Headers();
headers.append("Authorization", "Basic " + btoa(username + ":" + password));

function addEvent (event,refreshData){
  fetch(urlPostEvent, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(event)
  })
  .then(res => {
    console.log(event);
    console.log('res = ', res);
    console.log('res.status', res.status);
    console.log('res.ok', res.ok);
    return res.json()
  })
  .then(result => {
    console.log("Add Event result = ", result);
    refreshData();
  })
  .catch(error => {
    console.log("Err post = ", error);
  });
};

function MainPage (){

  const [dataEventInfo, setDataEventInfo] = useState([]);

  const [dataUpdated, setDataUpdated] = useState(false);
  const [eventsUpdated, setEventsUpdated] = useState(false);
  const [addNewEvent, setAddNewEvent] = useState(false);
  const refreshData = useCallback(() => setDataUpdated(!dataUpdated),[dataUpdated]);


  useEffect(() => {
    fetch(urlGetEvents, {
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
      console.log("fetch Events = ", result);
      const updatedDatainfo = result.map(st => {
        return {
          id: st.eventSerialNum,
          title: st.event_name,
          start: st.event_startdate,
          end: st.event_enddate,
          extendedProps: {
            eventAddress: st.event_address,
            eventNotes: st.event_notes,
            eventClient: st.clientNumber
          }
        };
      });
      console.log(updatedDatainfo);
      setDataEventInfo(updatedDatainfo);
      console.log(updatedDatainfo);
    })
    .catch(error => {
      console.log("Err post = ", error);
    });
  }, [dataUpdated]);


  console.log(dataEventInfo);



  const [dataEventInventory, setDataEventInventory] = useState([]);
  const [dataEventInventoryUpdate, setDataEventInventoryUpdate] = useState(false);

  /*useEffect(() => {
    fetch(urlGetInventoriesEvent, {
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
      console.log("fetch Events inventories = ", result);
      const updatedDatainfo = result.map(st => {
        return{
          itemSerialNum: st.itemSerialNum,
          itemAmount: st.itemAmount,
        };
      });
      console.log(updatedDatainfo);
      setDataEventInventory(updatedDatainfo);
    })
    .catch(error => {
      console.log("Err post = ", error);
    });
  }, [dataEventInventoryUpdate]);*/


  function deleteEvent(EventID){
    fetch(urlDeleteEvent, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({EventName : EventID})
    })
    .then(res => {
      console.log('Event number is: ', EventID);
      console.log('res = ', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      return res.json()
    })
    .then(result => {
      console.log("Delete Event result = ", result);
      refreshData();
    })
    .catch(error => {
      console.log("Err delete = ", error);
    });
  };


  const hebrewCalendar = {
    code: "he",
    week: {
      dow: 0, // Sunday is the first day of the week
      doy: 1, // The week that contains Jan 1st is the first week of the year
    },
    buttonText: {
      prev: "הקודם",
      next: "הבא",
      today: "היום",
      month: "חודש",
      week: "שבוע",
      day: "יום",
      list: "רשימת אירועים",
    },
    weekText: "שבוע",
    allDayText: "כל היום",
    moreLinkText: "עוד",
    noEventsText: "אין אירועים להצגה",
    eventLimitText: "עוד",
    dayPopoverFormat: { weekday: "long", month: "numeric", day: "numeric" },
    dayHeaderFormat: { weekday: "narrow" },
    slotLabelFormat: { hour: "numeric", minute: "2-digit", hour12: false },
    columnHeaderFormat: { weekday: "long", month: "numeric", day: "numeric", agenda: "list" },
    eventTimeFormat: { hour: "numeric", minute: "2-digit", hour12: false },

    eventRender: (info) => {
      info.el.querySelector(".fc-event-time").textContent =
        info.event.start.toLocaleTimeString("he-IL");
      info.el.querySelector(".fc-title").textContent = info.event.title;
    },
  };
  const eventClickUpdate = (info) => {
    const event = info.event;
    console.log('Clicked event:', event);
  };


  const calendarRef = useRef(null);
  const handleListButtonClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView("listWeek");
    }
  };



  return (
    <div id="mainBodyMainPage">

      <div id="headerMainPage">
        <button
          className="buttonMainPage"
          onClick={() => setAddNewEvent(true)}>הוספת אירוע
        </button>
        <h1>לוח אירועים</h1>
      </div>

      <div id="innerMainPage">
        <NewCalendarEvent trigger={addNewEvent}
                              setTrigger={setAddNewEvent}
                              addEvent={(item) => addEvent(item, refreshData)}/>
        <div id="calanderRight">
          
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              right: "next,today,prev",
              center: "title",
              left: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
            }}
            locale={hebrewCalendar}
            events={dataEventInfo}
            selectable={true}
            eventClick={eventClickUpdate}
            /*select={handleListButtonClick}
            eventContent={eventRender}*/
            />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
