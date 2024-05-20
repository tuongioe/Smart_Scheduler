import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel, eventDates} = useContext(GlobalContext);

  return (
      <React.Fragment>
          <div className="flex items-end justify-between ">
              <p className="text-white font-bold mt-10">My Calendars</p>
              <div className="items-end flex">
                  <button className="mr-2">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white items-end" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5 12h14m-7 7V5"/>
                      </svg>
                  </button>
                  <button>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m19 9-7 7-7-7"/>
                      </svg>
                  </button>
              </div>
          </div>

          {labels.map(({label: lbl, checked}, idx) => (
              <label key={idx} className="items-center mt-3 block">
                  <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                          updateLabel({label: lbl, checked: !checked})
                      }
                      className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
                  />
                  <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
              </label>
          ))}

          <div>
              {
                  eventDates.map(({label, checked, color}, index) => {
                      return <label key={index} className="items-center mt-3 block">
                          <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                  updateLabel({label, checked: !checked})
                              }
                              className={`form-checkbox h-5 w-5 text-${color}-400 rounded focus:ring-0 cursor-pointer`}
                          />
                          <span className={`ml-2 text-${color}-400 capitalize`}>{label}</span>
                      </label>
                  })
              }
          </div>
      </React.Fragment>
  );
}
