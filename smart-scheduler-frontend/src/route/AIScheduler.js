import React from "react";

export default function AIScheduler() {
  return (
    <div className="mt-20 flex flex-col md:flex-row items-center md:justify-around">
      <div className="w-[273px] h-[544px]">
        <div className="text-[22px] font-bold leading-[25.2px] text-center">
          Create new task
        </div>
        <div className="mt-[50px] relative">
          <div className="absolute -top-5 left-4 font-medium text-lg bg-[#262525] p-1 ">
            Title
          </div>
          <input
            type="text"
            name="taskTitle"
            id="taskId"
            placeholder="Enter title here"
            className="rounded-xl w-[217px] h-[47px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
          />
        </div>
        <div className="mt-[30px] w-[272px] h-[38px]">
          <label htmlFor="estimateTime" className="font-medium text-lg">
            Estimate Time
          </label>
          <select
            name="estimateTime"
            id="estimateTime"
            className="w-[134px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
          >
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
        <div className="mt-[30px] w-[272px] h-[38px]">
          <label htmlFor="taskType" className="text-lg font-medium">
            Calendar
          </label>
          <select
            name="taskType"
            id="taskType"
            className="w-[123px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
          >
            <option value="health" selected>
              Health
            </option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <div className="mt-[30px] w-[272px] h-[38px]">
          <label htmlFor="repeat" className="text-lg font-medium">
            Repeat
          </label>
          <select
            name="repeat"
            id="repeat"
            className="w-[134px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
          >
            <option value="1">1time/day</option>
            <option value="2">2time/day</option>
            <option value="3">3time/day</option>
            <option value="optionRepeat">Option...</option>
          </select>
        </div>
        <div className="mt-[30px] relative">
          <div className="absolute -top-5 left-4 text-lg font-medium bg-[#262525] p-1 ">
            Description
          </div>
          <input
            type="text"
            name="taskNote"
            id="taskNote"
            placeholder="Enter description here"
            className="rounded-xl w-[273px] h-[50px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
          />
        </div>
        <div className="mt-[50px] rounded-xl w-[273px] h-[50px] bg-[#262525] bg-primary-200 focus:outline-none text-center leading-[50px] font-medium text-lg hover:bg-primary-100 cursor-pointer">
          Add task
        </div>
      </div>
      <div className="w-[300px] h-[544px]">
        <div className="flex">
          <div className="mr-2 text-[22px] font-bold leading-[25.2px] text-center">
            Generate schedule for
          </div>
          <div className="text-[22px] text-primary-50 font-bold leading-[25.2px] text-center cursor-pointer">
            today
          </div>
        </div>
      </div>
    </div>
  );
}
