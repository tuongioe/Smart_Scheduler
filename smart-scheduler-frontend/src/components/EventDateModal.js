import React, {useContext, useEffect, useRef, useState} from "react";
import GlobalContext from "../context/GlobalContext";
import {Checkbox, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {axiosClient} from "../utils/util";

import dayjs from "dayjs";

export default function EventDateModal() {
  const {
    frame,
    setShowEventAddDateModel,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
      labels,
  } = useContext(GlobalContext);
  const [nextTime, setNextTime] = useState(daySelected);
  const modalRef = useRef();
  const [isAllDay, setIsAllDay] = useState(true);
  const [endDay, setEndDay] = useState(dayjs());
  const [isEndDay, setIsEndDay] = useState('never');
  const [repeatEveryDay, setRepeatEveryDay] = useState(1);
  const [repeatType, setRepeatType] = useState('day');
  const [repeatDateType, setRepeatDateType] = useState('no-repeat');
  const [isShowRepeat, setIsShowRepeat] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAllDay(event.target.checked);
  };
  
  useEffect(() => {
    setNextTime(daySelected.add(1,'hour'));
  }, [daySelected]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        setShowEventAddDateModel(false);
        setIsShowRepeat(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setShowEventAddDateModel]);



  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [noti, setNoti] = useState(
      selectedEvent ? selectedEvent.noti : ""
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labels.find((lbl) => lbl.id === labels.id)
      : labels[0]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const calendarEventPayload = {
      title,
      description,
      label: selectedLabel.label,
      from: daySelected.toISOString().slice(0,-1),
      to: nextTime.toISOString().slice(0,-1),
      isAllDay,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    const calendarEventUpload = {
      title,
      description,
      calendarId: selectedLabel.id,
      startTime: daySelected.toISOString().slice(0,-1),
      endTime: nextTime.toISOString().slice(0,-1),
      isRecurring: false,
    }

    if(repeatDateType === 'option'){
      const repeat = {
        type: repeatType,
        repeatGap: repeatEveryDay + '',
        dayOfWeek: [],
        endDate: new Date(endDay.format('YYYY-MM-DD')),
        hasEndDate: isEndDay === 'at',
      }

      calendarEventUpload.repeat = repeat;
    }


    if (selectedEvent) {
      // dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      console.log('upload: ',calendarEventUpload)

      const result = await axiosClient.post('/api/task', calendarEventUpload);

      console.log(result)
      dispatchCalEvent({ type: "push", payload: calendarEventPayload });
    }

    setShowEventAddDateModel(false);
  }

  const handleChange = (event) => {
    setSelectedLabel(
        labels.find((lbl) => lbl.label === event.target.value)
    )
  };

  const handleRadioChange = (event) => {
    setIsEndDay(event.target.value);
  }

  const handleRepeatEveryDay = (event) => {
    setRepeatEveryDay(event.target.value);
  }
  const handleRepeatType = (event) => {
    setRepeatType(event.target.value);
  }

  const handleEndDay = (event) => {
    setEndDay(dayjs(event.target.value));
  }

  const setRepeatDay = (num) => {
    const changeDay = repeatEveryDay + num;
    setRepeatEveryDay(changeDay > 0? changeDay: repeatEveryDay);
  }

  const handleShowRepeatModal = (isShow) => {
    setIsShowRepeat(isShow);
  }

  const handleRepeatDateType = (e) => {
    setRepeatDateType(e.target.value)
    if(e.target.value === 'option'){
      setIsShowRepeat(true);
    }
  }

  return (
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        {isShowRepeat ? <div className="bg-dark-color rounded-lg shadow-2xl w-1/4" ref={modalRef}>
          <header>
            <h2 className="text-center pt-[32px]">Repetition option</h2>
          </header>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-8">

              <div></div>

            </div>
            <div className=" pl-[64px] pr-[64px] text-[16px]">
              <div className="flex mt-[23px] mb-[23px] justify-between">
                <p className="mr-[14px]">Repeat every</p>
                <input type="number" value={repeatEveryDay} onChange={handleRepeatEveryDay}
                       className="text-center border border-gray-500 rounded  w-[40px] h-[27px] ml-[14px] mr-[14px]"/>
                <div className="flex flex-col ">
                  <button onClick={() => setRepeatDay(1)}>
                    <svg className="w-[15px] h-[15px]" viewBox="0 0 32 32" version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns="http://www.w3.org/1999/xlink" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                         strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="icomoon-ignore"></g>
                        <path
                            d="M16.767 12.809l-0.754-0.754-6.035 6.035 0.754 0.754 5.281-5.281 5.256 5.256 0.754-0.754-3.013-3.013z"
                            fill="#929292"></path>
                      </g>
                    </svg>
                  </button>
                  <button onClick={() => setRepeatDay(-1)}>
                    <svg className="w-[15px] h-[15px]" viewBox="0 0 32 32" version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns="http://www.w3.org/1999/xlink" fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                         strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="icomoon-ignore"></g>
                        <path
                            d="M15.233 19.175l0.754 0.754 6.035-6.035-0.754-0.754-5.281 5.281-5.256-5.256-0.754 0.754 3.013 3.013z"
                            fill="#929292"></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <select name="" id="" value={repeatType}
                        onChange={handleRepeatType}
                        className="border border-gray-500 rounded text-[#929292] bg-dark-color w-[92px] h-[27px]">
                  <option value="day">Day</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              <p className="mb-[20px]">End</p>
              <div>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={isEndDay}
                    onChange={handleRadioChange}
                    name="radio-buttons-group"
                >
                  <FormControlLabel value="never" control={<Radio/>} label="Never"/>
                  <FormControlLabel value="at" control={<Radio/>} label={
                    <div>
                      At
                      <input type="date" className="text-[#929292] border border-gray-500 p-1 rounded ml-[56px]"
                             onChange={handleEndDay} disabled={isEndDay !== 'at'} value={endDay.format('YYYY-MM-DD')}/>
                    </div>
                  }/>
                </RadioGroup>

              </div>
            </div>

          </div>
          <footer className="flex justify-around p-3 mt-5">
            <button
                type="button"
                onClick={() => {
                  handleShowRepeatModal(false)
                }}
                className="w-[121px] h-[40px] bg-[#878787] rounded text-white"
            >
              Cancel
            </button>
            <button
                type="submit"
                onClick={() => {
                  handleShowRepeatModal(false)
                }}
                className="w-[121px] h-[40px] bg-primary-400 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Done
            </button>
          </footer>
        </div> : <form className="bg-dark-color rounded-lg shadow-2xl w-1/4" ref={modalRef}>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-8">
              <div></div>

              <div className="flex justify-between">
                <div></div>
                <input
                    type="text"
                    name="title"
                    placeholder="Add title"
                    value={title}
                    required
                    className="ml-14 pt-3 bg-dark-color text-white border-0 text-xl font-semibold pb-2 w-full focus:outline-none focus:ring-0"
                    onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex">
                <svg className="mr-7" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     stroke="#ffffff">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                        d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </svg>
                <div className="">
                  <label>{daySelected.format("dddd, MMMM DD")}</label>

                  {frame !== "month" ?
                      <label className="ml-1"> {daySelected.format('hha')} - {nextTime.format('hha')}</label> : <></>}

                  <div></div>
                  <Checkbox
                      sx={{
                        color: '#00717F',
                        '&.Mui-checked': {
                          color: '#00717F',
                        },
                      }}
                      checked={isAllDay}
                      onChange={handleCheckboxChange}
                      inputProps={{'aria-label': 'controlled'}}
                  />

                  <label htmlFor="#allDay" className="text-[#00717F]">All Day</label>

                  <select id="repeat" className="bg-dark-color" value={repeatDateType} onChange={handleRepeatDateType}>
                    <option value="no-repeat">No repeat</option>
                    <option value="everyday">Every day</option>
                    <option value="every-thursday">Every thursday</option>
                    <option value="option">Option</option>
                  </select>
                </div>
              </div>

              <div className="flex">
              <span className="text-gray-400 mr-7">
                <svg className="w-6 h-6 text-gray-400" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                      stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>

                {selectedLabel && <div className="w-2 h-2 rounded mr-3 self-center"
                                       style={{backgroundColor: selectedLabel.color}}>
                </div>}


                <select className="bg-dark-color text-white"
                        onChange={handleChange}
                        value={selectedLabel}
                >
                  {labels.map((el, index) => (
                      <option key={`select-option-label-${index}`} value={el.label}>
                        {el.label}
                      </option>
                  ))}
                </select>
              </div>


              <div className="flex">
                <svg className="mr-7 w-6 h-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                </svg>

                <input
                    type="text"
                    name="description"
                    placeholder="Add a description"
                    value={description}
                    required
                    className="pt-3 bg-dark-color text-white border-0 pb-2 w-full focus:outline-none focus:ring-0 "
                    onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex">
              <span>
              <svg className=" mr-7 w-6 h-6 text-gray-400" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
              </svg>
            </span>
                <input
                    type="text"
                    name="description"
                    placeholder="30 minutes before"
                    value={noti}
                    required
                    className="pt-3 border-0 bg-dark-color text-white pb-2 w-full focus:outline-none"
                    onChange={(e) => setNoti(e.target.value)}
                />
              </div>
            </div>
          </div>
          <footer className="flex justify-end p-3 mt-5">
            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        </form>}
      </div>
  );
}
