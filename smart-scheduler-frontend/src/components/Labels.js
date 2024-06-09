import React, {useContext, useState} from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel, setShowEventAddLabelModelModal, labelClasses} = useContext(GlobalContext);

  const [isShowLabel, setIsShowLabel] = useState(true);
  const handleDisplayLabels = () => {
      setIsShowLabel(!isShowLabel);
  }

  return (
      <React.Fragment>
          <div className="flex items-end justify-around ">
              <div className="text-white font-bold size-[16px] mt-8" style={{textWrap:"nowrap", width:"70%"}}>My Calendars</div>
              <div className="items-end">
                  <button className="mr-2"
                    onClick={()=>setShowEventAddLabelModelModal(true)}
                  >
                      <svg className="w-[13px] h-[13px] text-gray-800 dark:text-white items-end" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M5 12h14m-7 7V5"/>
                      </svg>
                  </button>


                  <button onClick={()=>handleDisplayLabels()}>
                      <svg className="w-[13px] h-[13px] text-gray-800 dark:text-white" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m19 9-7 7-7-7"/>
                      </svg>
                  </button>
              </div>
          </div>

          <div>
              {
                  isShowLabel? labels.map(({label, checked, color}, index) => {
                      return <label key={index} className="items-center mt-3 block">
                          <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                  updateLabel({label, checked: !checked, color})
                              }
                              className={`form-checkbox h-5 w-5 text-red-600 rounded cursor-pointer outline-none`}
                              style={{accentColor: color, color:"red", border: "1px solid red"}}
                          />
                          <span className={`ml-2 capitalize text-red-50`} style={{color: color}}>{label}</span>
                      </label>
                  }):<></>
              }
          </div>
      </React.Fragment>
  );
}
