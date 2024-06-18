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
      setLabelSelected,
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
      ? "bg-primary-400 text-white rounded-full w-7 mx-auto mt-2"
      : "";
  }

  const handleParent = () => {
      setDaySelected(day);
      setShowEventAddDateModel(true);
      setSelectedEvent({
          title: "",
          description: "",
          noti: "",
      })
  }

  const handleChild = (e, evt) => {
      setDaySelected(day);
      setShowEventAddDateModel(true);

      setLabelSelected({
          id: evt.calendar.id,
          label: evt.calendar.title,
          color: evt.calendar.color
      })

      setSelectedEvent(evt);
  }

  return (
    <div className="border-r border-b border-gray flex flex-col w-[101px] h-[126px] font-bold">
      <header className="">
        {rowIdx === 0 && (
          <div className="text-sm mt-1 text-center">
            {day.format("ddd").toUpperCase()}
          </div>
        )}
        <div
          className={`text-sm p-1 my-1 ${getCurrentDayClass()} text-center`}
        >
          {day.format("DD")}
        </div>
      </header>

      <div
        className="flex-1 cursor-pointer"
      >
          {dayEvents.length > 0 ? dayEvents.map((evt, idx) => (
              <div
                  key={idx}
                  onClick={(e) => handleChild(e, evt)}
                  className={`w-full p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                  style={{backgroundColor: labels.find(el => el.label === evt.label).color}}
              >
                  {evt.title}
              </div>
          )) : <div className="w-full h-full" onClick={handleParent}></div>}

      </div>
    </div>
  );
}
