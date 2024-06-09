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
        labels
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
        <div className="border-r border-gray-200 w-[120px]" >
                {rowIdx === 0? (
                    <header className="flex flex-col items-center">
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

                    </header>
                ): (
                    <React.Fragment>
                    </React.Fragment>
                )}

            <div
                className="flex-1 cursor-pointer min-h-10 border-b h-[33px]"
                onClick={() => {
                    setDaySelected(day.set('hour',rowIdx));
                    setShowEventAddDateModel(true);
                }}
            >
                {dayEvents.map((evt, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}
                        className={`text-gray-600 rounded mb-1 truncate w-full w-[113px] h-[33px]`}
                        style={{fontSize:"12px",backgroundColor: labels.find(el=> el.label === evt.label).color}}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
