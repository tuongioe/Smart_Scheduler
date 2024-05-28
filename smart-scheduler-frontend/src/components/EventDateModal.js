import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import {Checkbox} from "@mui/material";

const labelsClasses = [
  {
    label: "indigo",
    color: "#fffff"
  },
  {
    label: "red",
    color: "#fffff"
  },
  {
    label: "blue",
    color: "#fffff"
  },
  {
    label: "green",
    color: "#fffff"
  },
  {
    label: "gray",
    color: "#fffff"
  },
  {
    label: "purple",
    color: "#fffff"
  }
];

export default function EventDateModal() {
  const {
    setShowEventAddDateModel,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
      labels,
  } = useContext(GlobalContext);

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
      ? labels.find((lbl) => lbl === labels.label)
      : labels[0]
  );

  function handleSubmit(e) {
    e.preventDefault();

    const calendarEvent = {
      title,
      description,
      label: selectedLabel.label,
      from: null,
      to: null,
      isAllDay: true,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventAddDateModel(false);
  }

  const handleChange = (event) => {
    setSelectedLabel(
        labels.find((lbl) => lbl.label === event.target.value)
    )
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-dark-color rounded-lg shadow-2xl w-1/4">
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
            <div className="flex flex-wrap">
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
              <div>
              <p >{daySelected.format("dddd, MMMM DD")}</p>
                <Checkbox
                    sx={{
                      color: '#00717F',
                      '&.Mui-checked': {
                        color: '#00717F',
                      },
                    }}
                />

                <label htmlFor="#allDay" className="text-[#00717F]">All Day</label>
              </div>
            </div>

            <div className="flex">
              <span className="text-gray-400 mr-7">
                <svg className="w-6 h-6 text-gray-400" width="30" height="30" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
                      stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>

              {selectedLabel && <div className="w-2 h-2 rounded mr-3 self-center"
                                     style={{backgroundColor: selectedLabel.color}}></div>}


              <select className="bg-dark-color text-white"
                      onChange={handleChange}
              >
                {labels.map((el, index)=>(
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
      </form>
    </div>
  );
}