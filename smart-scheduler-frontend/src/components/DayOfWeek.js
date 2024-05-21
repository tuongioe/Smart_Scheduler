import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function DayOfWeek({ day, rowIdx }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventAddDateModel,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) => {
                return dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
            }

        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-blue-custom-5 text-white rounded-full w-7"
            : "";
    }

    return (
        <div className="border-r border-b border-gray-200 flex flex-col" >
            <header className="flex flex-col items-center">
                {rowIdx === 0? (
                    <React.Fragment>
                        <p className="text-sm mt-1">
                            {day.format("ddd").toUpperCase()}
                        </p>
                        <p
                            className={`min-h-11 text-sm mt-1 text-center  ${getCurrentDayClass()}`}
                        >
                            {day.format("DD")}
                        </p>
                    </React.Fragment>
                ): (
                    <p
                        className={` p-1 my-1 text-center `}
                    >
                    </p>
                )}

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
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
