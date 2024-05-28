import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import CreateEventButton from "./CreateEventButton";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex, frame, setFrame, currentDayFrame, setCurrentDayFrame } = useContext(GlobalContext);
    function prevCalendar() {
        switch (frame){
            case 'week':
                setCurrentDayFrame(currentDayFrame.subtract(7, 'day'));
                break
            case 'day':
                setCurrentDayFrame(currentDayFrame.subtract(1, 'day'));
                break
            default:
                setCurrentDayFrame(currentDayFrame.subtract(1,'month'))
                break
        }
    }
    function nextCalendar() {
        switch (frame) {
            case 'week':
                setCurrentDayFrame(currentDayFrame.add(7, 'day'));
                break
            case 'day':
                setCurrentDayFrame(currentDayFrame.add(1, 'day'));
                break
            default:
                setCurrentDayFrame(currentDayFrame.add(1,'month'));
                break
        }
    }


  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function changeFrame(frame) {
      setCurrentDayFrame(dayjs());
      setFrame(frame)
  }
  return (
    <header>
      <div className="flex justify-center">
        <div className="text-white shadow-[0_5px_50px_5px_rgba(255,255,255,0.2)] rounded-b-full">
          <button className={`p-5 pl-10  ${frame === "day"? "text-teal-300":""}`} onClick={() => changeFrame("day")}>
            Day
          </button>
          <button className={`p-5 ${frame === "week"? "text-teal-300":""}`} onClick={() => changeFrame("week")}>
            Week
          </button>
          <button className={`p-5 pr-10 ${frame === "month"? "text-teal-300":""}`} onClick={() => changeFrame("month")}>
            Month
          </button>
        </div>
      </div>
      <div className="px-4 py-2 flex items-center justify-around">
        <div className="ml-10 px-4 py-2 flex items-center">
          <form className="max-w-md mx-auto mr-6">
              <label form="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search"
                         className="rounded-full block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Search here..." required/>
              </div>
          </form>
            <button
                onClick={handleReset}
                className="border rounded py-2 px-4 mr-5"
            >
                Today
            </button>
            <button onClick={prevCalendar}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path d="M15 6L9 12L15 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
            </button>
          <button onClick={nextCalendar}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path d="M9 6L15 12L9 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                </g>
              </svg>
          </button>
          <h2 className="ml-4 text-xl text-white font-bold">
            {currentDayFrame.format(
              "MMMM YYYY"
            )}
          </h2> 
        </div>
        <CreateEventButton />
      </div>
    </header>
  );
}
