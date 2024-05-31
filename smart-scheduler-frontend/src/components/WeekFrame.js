import React, {useContext, useEffect, useState} from "react";
import DayOfWeek from "./DayOfWeek";
import GlobalContext from "../context/GlobalContext";
import {getDayOfWeek} from "../utils/util";
import dayjs from "dayjs";

export default function WeekFrame() {
    const { currentDayFrame } = useContext(GlobalContext);
    const [week, setWeek] = useState(getDayOfWeek(currentDayFrame));
    const listTime = Array.from({ length: 23 }, (_, index) => `${(index + 1)%12} ${index > 12? "PM":"AM"}`);

    useEffect(() => {
        setWeek(getDayOfWeek(currentDayFrame));
    }, [currentDayFrame]);

    return (
        <React.Fragment>
            <div className="text-red grid grid-rows-24 text-red mt-[94px]">
                {
                    listTime.map((time, i) => {
                        return <div className="border-gray-200 p-1 mb-[25px]" >
                            {(
                                <React.Fragment key={`week-frame-header-${i}`}>
                                    <p
                                        className={`text-md `}
                                    >
                                        {time + ":"}
                                    </p>
                                </React.Fragment>
                            )}
                        </div>
                    })
                }
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-24 text-red">
                {
                    listTime.map((_, i) => (
                        week.map((row, hour) => (
                            <React.Fragment key={`week-frame-fragment-${i + hour}`}>
                                <DayOfWeek day={row.hour(i)} key={i + hour} rowIdx={i}/>
                            </React.Fragment>
                        ))
                    ))
                }
            </div>
        </React.Fragment>
    );
}
