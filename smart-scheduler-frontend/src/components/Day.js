import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventAddDateModel,
        filteredEvents,
        setSelectedEvent,
        labels
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
            ? "bg-blue-custom-5 text-white rounded-full w-7"
            : "";
    }

    return (
        <div className="border-t flex flex-col">
            <header className="flex flex-col items-center">
                {(
                    <React.Fragment>
                        <p className="min-h-11 text-sm mt-1">

                        </p>
                        <p
                            className={`text-sm p-1 my-1 text-center `}
                        >

                        </p>
                    </React.Fragment>
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
                        className={`text-gray-600 rounded mb-1 truncate`}
                        style={{fontSize:"12px",backgroundColor: labels.find(el=> el.label === evt.label).color}}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
