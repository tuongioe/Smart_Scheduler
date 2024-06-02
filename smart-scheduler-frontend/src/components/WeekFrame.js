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
            <div className="mt-[61px]">
                {
                    listTime.map((time, i) => {
                        return <div className="" >
                            {(
                                <React.Fragment key={`week-frame-header-${i}`}>
                                    <p
                                        className="mt-[44px]"
                                        style={{fontSize:"12px"}}
                                    >
                                        {time + ":"}
                                    </p>
                                </React.Fragment>
                            )}
                        </div>
                    })
                }
            </div>

            <div className="grid grid-cols-7 grid-rows-24 w-9/12">
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
