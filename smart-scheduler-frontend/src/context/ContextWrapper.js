import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
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
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  function addEventDate(color, label) {
      const totalEvent = eventDates;
      const eventIndex = totalEvent.findIndex(event => event.label === label)

      if(eventIndex === -1){
          totalEvent.push({
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
              checked: false
          });

          setLabels(
              labels
          )
  }

  return (
    <GlobalContext.Provider
      value={{
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
        setEventDates,
        eventDates,
        frame,
        setFrame,
        currentDayFrame,
        setCurrentDayFrame,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
