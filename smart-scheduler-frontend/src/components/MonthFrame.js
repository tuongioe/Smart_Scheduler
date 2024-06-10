import React from "react";
import DayOfMonth from "./DayOfMonth";
export default function MonthFrame({ month }) {
  return (
    <div className="grid grid-cols-7 grid-rows-5 max-w-[707px] max-h-[603px] overflow-y-scroll no-scrollbar">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <DayOfMonth day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
