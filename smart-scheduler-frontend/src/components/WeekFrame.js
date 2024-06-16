import React, {useContext, useEffect, useRef, useState} from "react";
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

    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Tăng tốc độ cuộn
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="w-[688px] overflow-auto no-scrollbar"
             ref={containerRef}
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
        >
            <div className="flex w-[1024px]">
                <div className="flex flex-col mt-[61px]">
                    {
                        listTime.map((time, i) => {
                            return <React.Fragment key={`week-frame-header-${i}`}>
                                        <span
                                            className="mt-[43px]"
                                            style={{fontSize: "12px", textWrap: "nowrap"}}
                                        >
                                            {time + ":"}
                                        </span>
                                    </React.Fragment>
                        })
                    }
                </div>

                <div className="grid grid-cols-7">
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
            </div>
        </div>
    );
}
