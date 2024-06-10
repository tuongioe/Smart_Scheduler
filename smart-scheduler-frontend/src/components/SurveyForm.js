import React from 'react';

import '../assets/App.css';
import axios from 'axios';

function convertTo24Hour(time) {
  // Extract the parts of the time string
  let [timePart, modifier] = [time.slice(0, -2), time.slice(-2).toUpperCase()];

  // Split the timePart into hours and minutes
  let [hours, minutes] = timePart.split(':');

  // Convert the hours and minutes to integers
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Handle AM/PM conversion
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  } else if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }

  // Format hours and minutes to always have two digits
  let hoursStr = hours.toString().padStart(2, '0');
  let minutesStr = minutes.toString().padStart(2, '0');

  // Return the time in 24-hour format
  return `${hoursStr}:${minutesStr}`;
}
const SurveyForm = ({
  timeOptions,
  closeForm,
  survey,
  convertTo12HourFormat,
}) => {
  const submitHandler = async (e) => {
    e.preventDefault();

    if (survey) {
      const data = {
        startTime: convertTo12HourFormat(e.target[1].value),
        title: e.target[0].value,
      };
      const token = localStorage.getItem('token');
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}api/survey/`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        closeForm();
      } catch (e) {
        console.log(e);
      }
    } else {
      const data = {
        startTime: convertTo12HourFormat(e.target[1].value),
        title: e.target[0].value,
      };
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}api/survey/create-single`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        closeForm();
      } catch (e) {
        console.log(e);
      }
    }
    console.log(convertTo24Hour(survey.startTime));
  };
  return (
    <>
      <div
        className="bg-[#000] opacity-70 fixed inset-0 z-10"
        onClick={closeForm}
      ></div>
      <form
        onSubmit={submitHandler}
        className="p-[50px]  h-[300px]   fixed top-[50%] left-[50%] w-[50%]  lg:w-[90%] translate-y-[-50%] translate-x-[-50%] z-20 col-span-8 bg-[#262525] dark:bg-dark-profile-right rounded-[20px]"
      >
        <div className="flex justify-center gap-[30px]">
          {/* <div className="Activity__Name">Dinner</div> */}
          <input
            type="text"
            defaultValue={survey ? survey.title : ''}
            className="text-3xl font-bold text-[#00bcd4] rounded-xl px-[20px] border-[#008494] border-solid border-[1px] bg-white w-[500px] h-[50px]"
          />
          <select
            id="time"
            defaultValue={convertTo24Hour(survey.startTime)}
            className="bg-[#008494] text-xl font-medium p-[12px] h-[50px] rounded-xl"
          >
            {timeOptions}
          </select>
        </div>
        <div className="mt-[60px] text-xl font-medium flex justify-center gap-5">
          <button
            className="bg-[#929292] rounded-xl px-[50px] py-[10px] "
            onClick={closeForm}
          >
            Cancel
          </button>
          <button className="px-[50px] rounded-xl py-[10px] bg-[#00717F]">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default SurveyForm;
