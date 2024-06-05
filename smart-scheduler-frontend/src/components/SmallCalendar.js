import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../utils/util";

export default function SmallCalendar() {
  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
    currentDayFrame,
    setCurrentDayFrame
  } = useContext(GlobalContext);

  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentDayFrame));
  }, [currentDayFrame]);


  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentDayFrame(currentDayFrame.subtract(1,'month'));
  }
  function handleNextMonth() {
    setCurrentDayFrame(currentDayFrame.add(1,'month'));
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-primary rounded-full text-red";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }
  return (
    <div className="w-[198px] h-[202px] p-3 border rounded-lg border-[rgba(146,146,146,0.5)] shadow-[0_1px_1px_1px_rgba(255,255,255,0.1)]">
      <header>
        <div className="flex justify-between">
          <button onClick={handlePrevMonth}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path d="M15 6L9 12L15 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
          </button>
          <div className="text-white font-bold item-center size-[16px] self-center">
            {currentDayFrame.format(
                "MMMM"
            )}
          </div>
          <button onClick={handleNextMonth}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> 
                <path d="M9 6L15 12L9 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
              </g>
            </svg>
          </button>
        </div>

      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
            <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={`small-calendar-fragment-${i}`}>
            {row.map((day, idx) => (
              <button
                key={`small-calendar-button-${idx}`}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
