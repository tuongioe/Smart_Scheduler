import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        daySelected,
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

    return (
        <div className="border-t flex flex-col">
            <div
                className="flex-1 cursor-pointer min-h-10"
                onClick={() => {
                    setDaySelected(day.set('hour',rowIdx));
                    setShowEventAddDateModel(true);
                }}
            >
                {dayEvents.map((evt, idx) => {
                    const from = dayjs(evt.from + 'z').get('hour');
                    const to = dayjs(evt.to + 'z').get('hour')

                    if(!evt.isAllDay){
                        if(rowIdx === from){
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedEvent(evt)}
                                    className={`text-gray-600 rounded mb-1 truncate min-h-10 w-full w-[113px] h-[33px]`}
                                    style={{fontSize:"12px",backgroundColor: labels.find(el=> el.label === evt.label).color}}
                                >
                                    {evt.title}
                                </div>
                            )
                        }

                    }else {
                        return <div
                            key={idx}
                            onClick={() => setSelectedEvent(evt)}
                            className={`text-gray-600 rounded mb-1 truncate w-full w-[113px] h-[33px]`}
                            style={{fontSize: "12px", backgroundColor: labels.find(el => el.label === evt.label).color}}
                        >
                            {evt.title}
                        </div>
                    }
                })}
            </div>
        </div>
    );
}
