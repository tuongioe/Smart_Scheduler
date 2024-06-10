import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPen, FaCalendarWeek, FaXmark } from 'react-icons/fa6';
import customAxios from '../utils/customAxios';

export default function AIScheduler() {
  const [formData, setFormData] = useState({
    taskTitle: '',
    estimateTime: '10 mins',
    taskType: 'health',
    repeat: 'noRepeat',
    taskNote: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isRepeatOpen, setisRepeatOpen] = useState(false);
  const [isRepeatDetailsOpen, setisRepeatDetailsOpen] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [repeatOption, setRepeatOption] = useState('Day');
  const [repeatTimes, setRepeatTimes] = useState('1');
  const [repeatDays, setRepeatDays] = useState([]);
  const [endOption, setEndOption] = useState('never');
  const [endDate, setEndDate] = useState(new Date());

  const openEditModal = (index) => {
    setCurrentTaskIndex(index);
    setFormData(submittedData[index]);
    setisEditOpen(true);
  };

  const closeEditModal = () => {
    setisEditOpen(false);
    setCurrentTaskIndex(null);
  };

  const openRepeatModal = () => {
    setisRepeatOpen(true);
  };

  const closeRepeatModal = () => {
    setisRepeatOpen(false);
  };

  const openRepeatDetailsModal = (index) => {
    setisRepeatDetailsOpen(true);
    setFormData(submittedData[index]);
    setCurrentTaskIndex(index);
  };

  const closeRepeatDetailsModal = () => {
    setisRepeatDetailsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'repeat' && value === 'optionRepeat') {
      openRepeatModal();
    }
  };

  const handleRepeatOptionChange = (e) => {
    setRepeatOption(e.target.value);
  };

  const handleRepeatTimesChange = (e) => {
    setRepeatTimes(e.target.value);
  };

  const handleRepeatDayChange = (e) => {
    const { value } = e.target;
    setRepeatDays((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
  };

  const handleEndOptionChange = (e) => {
    setEndOption(e.target.value);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTaskIndex !== null) {
      const updatedData = [...submittedData];
      updatedData[currentTaskIndex] = formData;
      setSubmittedData(updatedData);
    } else {
      setSubmittedData([...submittedData, formData]);
    }
    setFormData({
      taskTitle: '',
      estimateTime: '30 min',
      taskType: 'health',
      repeat: 'noRepeat',
      taskNote: '',
    });
    closeEditModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const updatedData = submittedData.filter(
      (_, index) => index !== currentTaskIndex
    );
    setSubmittedData(updatedData);
    closeEditModal();
  };

  const dayMapping = {
    M: 'Monday',
    T: 'Tuesday',
    W: 'Wednesday',
    Th: 'Thursday',
    F: 'Friday',
    Sa: 'Saturday',
    S: 'Sunday',
  };

  const fetchTest = async () => {
    localStorage.getItem('token');
    console.log(await customAxios.get('/api/calendar/month/2024/05/23'));
  };

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <div className="flex-1">
      <div className="h-screen items-center flex flex-col md:flex-row md:justify-around md:items-start">
        {/* Left col */}
        <div className="w-[273px] my-auto">
          <div className="text-[22px] font-bold leading-[25.2px] text-center">
            Create new task
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-[50px] relative">
              <div className="absolute -top-5 left-4 font-medium text-lg bg-[#262525] p-1 ">
                Title
              </div>
              <input
                type="text"
                name="taskTitle"
                id="taskId"
                placeholder="Enter title here"
                value={formData.taskTitle}
                onChange={handleChange}
                required
                className="rounded-xl w-full h-[47px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
              />
            </div>
            <div className="mt-[30px] w-[272px] h-[38px]">
              <label htmlFor="estimateTime" className="font-medium text-lg">
                Estimate Time
              </label>
              <select
                name="estimateTime"
                id="estimateTime"
                required
                onChange={handleChange}
                value={formData.estimateTime}
                className="w-[134px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
              >
                <option value="10 mins">10 mins</option>
                <option value="20 min">20 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="5 hours">5 hours</option>
              </select>
            </div>
            <div className="mt-[30px] w-[272px] h-[38px]">
              <label htmlFor="taskType" className="text-lg font-medium">
                Calendar
              </label>
              <select
                name="taskType"
                id="taskType"
                required
                onChange={handleChange}
                value={formData.taskType}
                className="w-[123px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
              >
                <option value="health">Health</option>
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
                required
                onChange={handleChange}
                value={formData.repeat}
                className="w-[134px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
              >
                <option value="noRepeat">No repeat</option>
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
                onChange={handleChange}
                value={formData.taskNote}
                className="rounded-xl w-[273px] h-[50px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-[30px] rounded-xl w-[273px] h-[50px] text-center leading-[50px] font-medium text-lg hover:bg-primary-100 md:mt-[50px]"
              style={{ border: '1px solid #004B55' }}
            >
              Add task
            </button>
          </form>
        </div>
        {/* Right col */}
        <div className="w-[346px] my-auto">
          <div className="flex justify-center">
            <div className="mr-2 text-[22px] font-bold leading-[25.2px] text-center">
              Generate schedule
            </div>
          </div>
          <div className="mt-[50px] w-[346px] h-[526px] border border-primary-200 rounded-xl relative">
            {submittedData.length > 0 ? (
              submittedData.map((task, index) => (
                <div
                  key={index}
                  className={`group py-5 flex hover:bg-[#373636] ${
                    index === 0 ? 'rounded-t-xl' : ''
                  }`}
                >
                  <div className="w-2/12 cursor-pointer">
                    <i
                      className="hidden group-hover:flex justify-center text-small-text hover:text-white"
                      onClick={() => openEditModal(index)}
                    >
                      <FaPen />
                    </i>
                  </div>
                  <div
                    className="w-8/12 cursor-pointer flex justify-between"
                    onClick={() => openEditModal(index)}
                  >
                    <p className="text-sm font-light leading-[16px] mr-1 w-6/12 text-small-text">
                      {task.taskTitle.length > 16
                        ? task.taskTitle.substring(0, 14) + '...'
                        : task.taskTitle}
                    </p>
                    <p className="text-sm font-light leading-[16px] mr-1 w-6/12 text-small-text">
                      6:30am - 7:00am
                    </p>
                  </div>
                  <div className="w-2/12 cursor-pointer flex justify-center text-small-text hover:text-white">
                    {task.repeat === 'optionRepeat' && (
                      <i onClick={() => openRepeatDetailsModal(index)}>
                        <FaCalendarWeek />
                      </i>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                Generate some tasks
              </div>
            )}
            <div className="absolute bottom-10 left-0 right-0 m-auto rounded-xl w-[273px] h-[50px] bg-primary-200 text-center leading-[50px] font-medium text-lg hover:bg-primary-100 cursor-pointer">
              Generate Schedule
            </div>
          </div>
        </div>
      </div>

      {/* Repeat Modal */}
      {isRepeatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-[#262525] p-6 rounded-xl w-[300px]">
            <h2 className="text-xl font-bold mb-4">Repeat Options</h2>
            <div className="mb-4">
              <label className="block mb-2">Repeat every:</label>
              <select
                value={repeatOption}
                onChange={handleRepeatOptionChange}
                className="w-full p-2 rounded bg-[#262525] border border-primary-200"
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
              </select>
            </div>
            {repeatOption === 'Day' && (
              <div className="mb-4">
                <label className="block mb-2">Times:</label>
                <select
                  value={repeatTimes}
                  onChange={handleRepeatTimesChange}
                  className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                >
                  <option value="1">1 time</option>
                  <option value="2">2 times</option>
                  <option value="3">3 times</option>
                  <option value="4">4 times</option>
                  <option value="5">5 times</option>
                </select>
              </div>
            )}
            {repeatOption === 'Week' && (
              <div className="mb-4">
                <label className="block mb-2">Days:</label>
                <div className="flex space-x-2">
                  {['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'].map((day) => (
                    <button
                      key={day}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        repeatDays.includes(day)
                          ? 'bg-primary-50 text-white'
                          : 'bg-[#262525] border border-primary-200'
                      }`}
                      onClick={() =>
                        handleRepeatDayChange({ target: { value: day } })
                      }
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2">End:</label>
              <select
                value={endOption}
                onChange={handleEndOptionChange}
                className="w-full p-2 rounded bg-[#262525] border border-primary-200"
              >
                <option value="never">Never</option>
                <option value="onDate">On Date</option>
              </select>
            </div>
            {endOption === 'onDate' && (
              <div className="mb-4">
                <label className="block mb-2">End Date:</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                />
              </div>
            )}
            <button
              onClick={closeRepeatModal}
              className="w-full mt-4 bg-primary-50 p-2 rounded text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#262525] max-w-custom w-[420px] rounded-xl shadow-custom flex justify-center items-center">
            <div className="w-8/12 flex-col justify-center items-center">
              <div className="flex flex-col font-medium text-lg mt-8 items-center">
                <div className="mr-1">EDIT TASK</div>
                <div className="text-primary-50 text-center">
                  {formData.taskTitle}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label htmlFor="estimateTime" className="font-medium text-lg">
                    Estimate Time
                  </label>
                  <select
                    name="estimateTime"
                    id="estimateTime"
                    required
                    onChange={handleChange}
                    value={formData.estimateTime}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:h-[38px] md:w-[134px]"
                  >
                    <option value="10 mins">10 mins</option>
                    <option value="20 min">20 mins</option>
                    <option value="30 mins">30 mins</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="4 hours">4 hours</option>
                    <option value="5 hours">5 hours</option>
                  </select>
                </div>
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label htmlFor="taskType" className="text-lg font-medium">
                    Calendar
                  </label>
                  <select
                    name="taskType"
                    id="taskType"
                    required
                    onChange={handleChange}
                    value={formData.taskType}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:w-[123px] md:h-[38px]"
                  >
                    <option value="health">Health</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                  </select>
                </div>
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label htmlFor="repeat" className="text-lg font-medium">
                    Repeat
                  </label>
                  <select
                    name="repeat"
                    id="repeat"
                    required
                    onChange={handleChange}
                    value={formData.repeat}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:w-[134px] md:h-[38px]"
                  >
                    <option value="noRepeat">No repeat</option>
                    <option value="optionRepeat">Option...</option>
                  </select>
                </div>
                <div className="mt-[50px] relative md:mt-[30px]">
                  <div className="absolute -top-5 left-4 text-lg font-medium bg-[#262525] p-1 ">
                    Description
                  </div>
                  <input
                    type="text"
                    name="taskNote"
                    id="taskNote"
                    placeholder="Enter description here"
                    onChange={handleChange}
                    value={formData.taskNote}
                    className="rounded-xl w-full h-[50px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
                  />
                </div>
                <div className="my-[30px] w-full flex justify-around">
                  <button
                    type="button"
                    className="rounded-xl w-5/12 h-[50px] bg-[#b02d2d] opacity-90 focus:outline-none text-center leading-[50px] font-medium text-lg hover:opacity-100"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl w-5/12 h-[50px] bg-primary-200 focus:outline-none text-center leading-[50px] font-medium text-lg hover:bg-primary-100"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Repeat Details Modal */}
      {isRepeatDetailsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#262525] max-w-custom w-[420px] rounded-xl shadow-custom flex justify-center items-center relative">
            <i
              className="absolute top-2 right-2 text-small-text cursor-pointer hover:text-white"
              onClick={closeRepeatDetailsModal}
            >
              <FaXmark />
            </i>
            <div className="flex-col justify-center items-center">
              <div className="flex flex-col font-medium text-lg mt-8 items-center">
                <div className="mr-1">REPEATION DETAILS</div>
                <div className="text-primary-50 text-center">
                  {formData.taskTitle}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex text-lg mt-[30px] w-[200px]">
                  <div className="mr-3 font-medium">When: </div>
                  <div className="">6:30am - 7:00am</div>
                </div>
                <div className="flex text-lg mt-[10px] w-[200px]">
                  <div className="mr-3 font-medium">Repeat every: </div>
                  <div className="">{repeatOption}</div>
                </div>
                <div className="text-lg mt-[10px] w-[200px]">
                  {repeatOption === 'Day' && (
                    <div className="flex">
                      <div className="mr-3 font-medium">Times:</div>
                      <div className="">{repeatTimes}</div>
                    </div>
                  )}
                  {repeatOption === 'Week' && (
                    <div className="flex">
                      <div className="mr-3 font-medium">Repeat on:</div>
                      <div className="flex flex-wrap flex-row">
                        <div className="">
                          {repeatDays.map((day) => (
                            <div className="">
                              <span key={day}>{dayMapping[day]}</span>
                              <span>,</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex text-lg mt-[10px] mb-[30px] w-[200px]">
                  <div className="w-[90px] mr-3 font-medium whitespace-nowrap">
                    End day:
                  </div>
                  <div className="">
                    {endOption === 'never' ? (
                      'Never'
                    ) : (
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
