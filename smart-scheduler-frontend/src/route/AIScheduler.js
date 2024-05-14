import React from "react";

export default function AIScheduler() {
  return (
    <div>
      <div>
        <input
          type="text"
          name="taskName"
          id="taskName"
          placeholder="Enter title here"
        />
      </div>
      <div>
        <label for="estimateTime">Estimate Time</label>
        <select name="estimateTime" id="estimateTime">
          <option value="30" selected>
            30 min
          </option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
          <option value="180">3 hours</option>
          <option value="300">5 hours</option>
          <option value="720">12 hours</option>
          <option value="1440">1 day</option>
        </select>
      </div>
      <div>
        <label for="calendarType">Calendar</label>
        <select name="calendarType" id="calendarType">
          <option value="health" selected>
            Health
          </option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
