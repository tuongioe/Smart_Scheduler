import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import CalendarHeader from "../components/CalendarHeader.js";
import EventAddLabelModel from "../components/EventAddLabelModel.js";
import { getMonth } from "../utils/util.js";
import GlobalContext from "../context/GlobalContext.js";
import MonthFrame from "../components/MonthFrame.js";
import WeekFrame from "../components/WeekFrame.js";
import DayFrame from "../components/DayFrame.js";
import SmallCalendar from "../components/SmallCalendar";
import Labels from "../components/Labels";
import EventDateModal from "../components/EventDateModal";

export default function Calendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { showEventAddDateModel, showEventAddLabelModel, frame, currentDayFrame } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentDayFrame));
  }, [currentDayFrame]);

  let content;

  switch (frame) {
    case 'month':
      content = <MonthFrame month={currenMonth} />
      break;
    case 'week':
      content = <WeekFrame />
      break;
    case 'day':
      content = <DayFrame />
      break;
    default:
      content = <div>Invalid frame</div>;
  }

  return (
      <React.Fragment>
        {showEventAddDateModel && <EventDateModal />}
        {showEventAddLabelModel && <EventAddLabelModel />}

        <div className={`${frame === "month"? "h-screen":""} flex flex-col bg-dark-color text-white pl-[24px] no-scrollbar`}>
          <CalendarHeader />
          <div className="h-screen w-screen flex overflow-y-scroll no-scrollbar">
            <aside className="w-[198px] mr-8 ml-[32px]">
              <SmallCalendar />
              <Labels />
            </aside>
            {
              content
            }
          </div>
        </div>
      </React.Fragment>
  );
}
