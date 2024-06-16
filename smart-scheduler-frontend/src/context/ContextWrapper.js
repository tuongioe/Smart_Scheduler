import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import {axiosClient} from "../utils/util";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
      case "new":
          return payload;
    case "push":
      return [...state, payload];
    case "update":
        state.map((evt) =>
            {
                console.log(evt)
                return evt.id === payload.id ? payload : evt
            }
        )
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventAddLabelModel, setShowEventAddLabelModelModal] = useState(false);
  const [showEventAddDateModel, setShowEventAddDateModel] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [labelSelected, setLabelSelected] = useState();

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const [labelClasses, setLabelClasses] = useState([
      {
          label: "white",
          color: "#ffffff"
      },
      {
          label: "red",
          color: "#f00"
      },
      {
          label: "blue",
          color: "#004cff"
      },
      {
          label: "green",
          color: "#31ff00"
      },
      {
          label: "grey",
          color: "#a9a9a9"
      },
      {
          label: "purple",
          color: "#9300ff"
      }
  ])
  const [currentDayFrame, setCurrentDayFrame] = useState(dayjs());
  const [frame, setFrame] = useState("month");
  const [eventDates, setEventDates] = useState([]);
  const [currentYear, setCurrentYear] = useState(dayjs());

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  // useEffect(() => {
  //   setLabels((prevLabels) => {
  //     return [...new Set(savedEvents.map((evt) => evt.label))].map(
  //       (label) => {
  //         const currentLabel = prevLabels.find(
  //           (lbl) => lbl.label === label
  //         );
  //         return {
  //           label,
  //           checked: currentLabel ? currentLabel.checked : true,
  //         };
  //       }
  //     );
  //   });
  // }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventAddLabelModel) {
      setSelectedEvent(null);
    }
  }, [showEventAddLabelModel]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.id === label.id ? label : lbl))
    );
  }

  function deleteLabel(id) {
      setLabels(
          labels.filter((lbl) => (lbl.id !== id))
      )
  }

  function addEventDate(id, color, label) {
      const totalEvent = eventDates;
      const eventIndex = totalEvent.findIndex(event => event.label === label)

      if(eventIndex === -1){
          totalEvent.push({
              id,
              color,
              label,
              checked: true
          });

          setEventDates(
              totalEvent
          )
      }
  }

  function addLabel(id, color, label) {
          labels.push({
              id,
              color,
              label,
              checked: true
          });

          setLabels(
              labels
          )
  }

    const fetchDate = async () => {
        return axiosClient.get(`/api/calendar/year/${currentDayFrame.get('year')}/${currentDayFrame.get('month')+1}/${currentDayFrame.get('date')}`);
    }

  function updateLocalStorage() {
      fetchDate().then(result=>{
          const listCalendar = [];
          const listLabels = [];

          if(result.data.data.length > 0){
              // console.log(result.data.data)
              const listData = result.data.data;
              for(let dataIndex = 0; dataIndex<listData.length; dataIndex ++){
                  const calendar = listData[dataIndex];
                  const listTask = calendar.tasks;

                  const label = {
                      id: calendar.id,
                      label: calendar.title,
                      color: calendar.color,
                      checked: true,
                  };

                  listLabels.push(label);
                  if(listTask){
                      for(let taskIndex = 0; taskIndex < listTask.length; taskIndex++){
                          const task = listTask[taskIndex];

                          listCalendar.push({
                              ...task,
                              id: task.id,
                              from: task.startTime,
                              to: dayjs(task.endTime),
                              day: dayjs(task.startTime),
                              label: task.calendar.title,
                              isAllDay: task.startTime !== task.endTime,
                          })
                      }
                  }

              }
          }

          dispatchCalEvent({ type: 'new', payload: listCalendar });
          setLabels(listLabels);
      }).catch(error => {
          console.log(error)
      })
  }

  return (
    <GlobalContext.Provider
      value={{
          currentYear,
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventAddLabelModel,
        setShowEventAddLabelModelModal,
        showEventAddDateModel,
        setShowEventAddDateModel,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
          labelClasses,
          setLabelClasses,
        filteredEvents,
        addEventDate,
          addLabel,
          setCurrentYear,
        setEventDates,
        eventDates,
        frame,
        setFrame,
        currentDayFrame,
        setCurrentDayFrame,
          deleteLabel,
          updateLocalStorage,
          labelSelected,
          setLabelSelected,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
