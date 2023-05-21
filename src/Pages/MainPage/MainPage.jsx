import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NewCalendarEvent from "./NewCalendarEvent";
import "./MainPageCss.css";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DataTable from "react-data-table-component";

const urlGetEvents =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/GreenEvents/get";
const urlPostEvent =
  "https://proj.ruppin.ac.il/cgroup96/prod/api/GreenEvents/post";
const urlDeleteEvent = "https://your-api-url.com/api/events/delete";

const username = "your_username";
const password = "your_password";

const headers = new Headers();
headers.append("Authorization", "Basic " + btoa(username + ":" + password));

function addEvent(event, refreshData) {
  fetch(urlPostEvent, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => {
      console.log(event);
      console.log("res = ", res);
      console.log("res.status", res.status);
      console.log("res.ok", res.ok);
      return res.json();
    })
    .then((result) => {
      console.log("Add Event result = ", result);
      refreshData();
    })
    .catch((error) => {
      console.log("Err post = ", error);
    });
}

function MainPage() {
  const [dataEventInfo, setDataEventInfo] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [eventsUpdated, setEventsUpdated] = useState(false);
  const [addNewEvent, setAddNewEvent] = useState(false);
  const refreshData = useCallback(
    () => setDataUpdated(!dataUpdated),
    [dataUpdated]
  );

  useEffect(() => {
    fetch(urlGetEvents, {
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
        console.log("fetch Events = ", result);
        const updatedDatainfo = result.map((st) => {
          return {
            EventName: st.event_name,
            DateandTime: st.event_startdate,
          };
        });
        console.log(updatedDatainfo);
        setDataEventInfo(updatedDatainfo);
      })
      .catch((error) => {
        console.log("Err post = ", error);
      });
  }, [eventsUpdated]);

  function deleteEvent(EventID) {
    fetch(urlDeleteEvent, {
      method: "DELETE",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ EventName: EventID }),
    })
      .then((res) => {
        console.log("Event number is: ", EventID);
        console.log("res = ", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then((result) => {
        console.log("Delete Event result = ", result);
        refreshData();
      })
      .catch((error) => {
        console.log("Err delete = ", error);
      });
  }

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
      list: "רשימה",
    },
    weekText: "שבוע",
    allDayText: "כל היום",
    moreLinkText: "עוד",
    noEventsText: "אין אירועים להצגה",
    eventLimitText: "עוד",
    dayPopoverFormat: { weekday: "long", month: "numeric", day: "numeric" },
    dayHeaderFormat: { weekday: "narrow" },
    slotLabelFormat: { hour: "numeric", minute: "2-digit", hour12: false },
    columnHeaderFormat: { weekday: "long", month: "numeric", day: "numeric" },
    eventTimeFormat: { hour: "numeric", minute: "2-digit", hour12: false },

    eventRender: (info) => {
      info.el.querySelector(".fc-event-time").textContent =
        info.event.start.toLocaleTimeString("he-IL");
      info.el.querySelector(".fc-title").textContent = info.event.title;
    },
  };

  const columnsLeftData = [
    {
      name: "תאריך ושעה",
      selector: "DateandTime",
      right: true,
      sortable: true,
      width: "60%",
      cell: (row) => <div>{row.event_startdate}</div>,
    },
    {
      name: "שם אירוע",
      selector: "EventName",
      right: true,
      sortable: true,
      width: "30%",
    },
    {
      name: "",
      selector: "Setting",
      center: true,
      width: "5%",
      cell: (row) => (
        <div>
          <Menu className="menuListRow">
            <MenuHandler>
              <MoreVertIcon />
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <EditIcon />
              </MenuItem>
              <MenuItem>
                <DeleteIcon onClick={deleteEvent} />
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ),
    },
  ];
  const reversedColumns = [...columnsLeftData].reverse();
  const renderEventContent = (eventInfo) => {
    let { time, place } = eventInfo.event.extendedProps;
    return (
      <>
        <div className="fc-event-time">{time}</div>
        <div className="fc-event-title">{eventInfo.event.title}</div>
        <div className="fc-event-place">{place}</div>
      </>
    );
  };

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
  };
  const handleSave = ({ title, date }) => {
    addEvent({ title, date });
  };

  return (
    <div id="mainBodyMainPage">
      <div id="headerMainPage">
        <button className="buttonMainPage" onClick={() => setAddNewEvent(true)}>
          הוספת אירוע
        </button>
        <h1>לוח אירועים</h1>
      </div>

      <div id="innerMainPage">
        <NewCalendarEvent
          trigger={addNewEvent}
          setTrigger={setAddNewEvent}
          addEvent={(item) => addEvent(item, refreshData)}
        />

        <div className="calanderRight">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              right: "next today,prev",
              center: "title",
              left: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            locale={hebrewCalendar}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventContent={renderEventContent}
          />
        </div>

        <div className="dataListLeft">
          <div className="headerDataListLeft">רשימת אירועים ואילוצים </div>
          <div>
            <DataTable columns={reversedColumns} data={dataEventInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
