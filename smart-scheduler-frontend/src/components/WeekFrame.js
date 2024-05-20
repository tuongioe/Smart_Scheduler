import React, {useContext, useState} from "react";
import DayOfWeek from "./DayOfWeek";
import GlobalContext from "../context/GlobalContext";
import {getDayOfWeek} from "../util";
import dayjs from "dayjs";

export default function WeekFrame() {
    const { currentDayFrame } = useContext(GlobalContext);
    const [week, setWeek] = useState(getDayOfWeek(currentDayFrame));
    const listTime = Array.from({ length: 23 }, (_, index) => `${(index + 1)%12} ${index > 12? "PM":"AM"}`);

    return (
        <React.Fragment>
            <div className="text-red mt-[22px]">
                <div className="min-h-11"></div>
                {
                    listTime.map((time, i) => {
                        return <div className="border-gray-200" >
                            {(
                                <React.Fragment key={`week-frame-header-${i}`}>
                                    <p
                                        className={`mt-[15px] text-md `}
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
