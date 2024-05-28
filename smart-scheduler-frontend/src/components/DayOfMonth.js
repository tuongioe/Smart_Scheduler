import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function DayOfMonth({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
      setShowEventAddDateModel,
    filteredEvents,
    setSelectedEvent,
      labels,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-primary text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border-r border-b border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>

      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
            setShowEventAddDateModel(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`w-full p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            style={{backgroundColor: labels.find(el=> el.label === evt.label).color}}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}