import { useEffect, useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPen, FaCalendarWeek, FaXmark } from 'react-icons/fa6';
import { dayMapping, estimateTimeOptions } from '../utils/renderArr';
import {
  createManyTasks,
  generateTask,
  getAllCalendars,
} from '../apis/generate';
import { formatAmPmDate, toISOWithoutZ } from '../utils/dateFormat';
import ReactLoading from 'react-loading';

export default function AIScheduler() {
  const [formData, setFormData] = useState({
    title: '',
    estimatedTime: '30',
    calendarId: '',
    description: '',
    isRecurring: false,
  });
  const [repeat, setRepeat] = useState({
    type: 'day',
    repeatGap: '1',
    dayOfWeek: [],
    endDate: new Date(),
    hasEndDate: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [calendars, setCalendars] = useState([]);

  // const openEditModal = (index) => {
  //   setCurrentTaskIndex(index);
  //   setFormData(generatedTasks[index]);
  //   setIsEditOpen(true);
  // };

  // const closeEditModal = () => {
  //   setIsEditOpen(false);
  //   setCurrentTaskIndex(null);
  // };

  // const openRepeatModal = () => {
  //   setIsRepeatOpen(true);
  // };

  // const closeRepeatModal = () => {
  //   setIsRepeatOpen(false);
  // };

  // const openRepeatDetailsModal = (index) => {
  //   setisRepeatDetailsOpen(true);
  //   setFormData(generatedTasks[index]);
  //   setCurrentTaskIndex(index);
  // };

  // const closeRepeatDetailsModal = () => {
  //   setisRepeatDetailsOpen(false);
  // };

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   const updatedData = generatedTasks.filter(
  //     (_, index) => index !== currentTaskIndex
  //   );
  //   setGeneratedTasks(updatedData);
  //   closeEditModal();
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRepeatChange = (e) => {
    setRepeat({
      ...repeat,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateBtnClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { title, calendarId, description, estimatedTime, isRecurring } =
      formData;
    const request = {
      title,
      calendarId,
      description,
      estimatedTime,
      isRecurring,
    };
    if (isRecurring === 'true') {
      const cleanRepeat = {
        type: repeat.type,
        repeatGap: repeat.repeatGap,
        dayOfWeek: repeat.dayOfWeek,
      };
      if (repeat.hasEndDate === 'true')
        cleanRepeat.endDate = toISOWithoutZ(repeat.endDate);
      request.repeat = cleanRepeat;
    }
    console.log(request);
    const task = await generateTask(request);
    setGeneratedTasks([...generatedTasks, task]);
    console.log(task);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const createdTasks = await createManyTasks(generatedTasks);
    console.log(createdTasks);
    setIsLoading(false);
  };

  const fetchCalendars = async () => {
    const { data } = await getAllCalendars();
    setCalendars(data);
    setFormData({ ...formData, calendarId: data[0].id });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center">
        <ReactLoading height={'3%'} width={'3%'} />
      </div>
    );

  return (
    <div className="flex-1">
      <div className="h-screen items-center flex flex-row justify-around">
        {/* Left col */}
        <form method="post" className="w-[273px] my-auto">
          <div className="text-[22px] font-bold leading-[25.2px] text-center">
            Create new task
          </div>
          <div className="mt-[50px] relative">
            <div className="absolute -top-5 left-4 font-medium text-lg bg-[#262525] p-1 ">
              Title
            </div>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title here"
              required
              className="rounded-xl w-full h-[47px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
            />
          </div>
          <div className="mt-[30px] w-[272px] h-[38px]">
            <label className="font-medium text-lg">Estimate Time</label>
            <select
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              required
              className="w-[134px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
            >
              {estimateTimeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-[30px] w-[272px] h-[38px]">
            <label className="text-lg font-medium">Calendar</label>
            <select
              name="calendarId"
              value={formData.calendarId}
              onChange={handleChange}
              required
              className="w-[123px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
            >
              {calendars.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-[30px] w-[272px] h-[38px]">
            <label className="text-lg font-medium">Repeat</label>
            <select
              name="isRecurring"
              onChange={(e) => {
                if (e.target.value === 'true') setIsRepeatOpen(true);
                handleChange(e);
              }}
              required
              value={formData.isRecurring}
              className="w-[134px] h-[38px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right"
            >
              <option value={false}>No repeat</option>
              <option value={true}>Option...</option>
            </select>
          </div>
          {/* Description */}
          <div className="mt-[30px] relative">
            <label className="absolute -top-5 left-4 text-lg font-medium bg-[#262525] p-1 ">
              Description
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description here"
              className="rounded-xl w-[273px] h-[50px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerateBtnClick}
            className="mt-[30px] rounded-xl w-[273px] h-[50px] text-center leading-[50px] font-medium text-lg hover:bg-primary-100 md:mt-[50px]"
            style={{ border: '1px solid #004B55' }}
          >
            Add task
          </button>
        </form>
        {/* Right col */}
        <div className="w-[346px] my-auto">
          <div className="flex justify-center">
            <div className="mr-2 text-[22px] font-bold leading-[25.2px] text-center">
              Generate schedule
            </div>
          </div>
          <div className="mt-[50px] w-[346px] h-[526px] border border-primary-200 rounded-xl relative">
            {generatedTasks.length > 0 ? (
              generatedTasks.map(({ title, startTime, endTime }, index) => (
                <div
                  key={index}
                  className={`group py-5 flex hover:bg-[#373636] ${
                    index === 0 ? 'rounded-t-xl' : ''
                  }`}
                >
                  <div className="w-2/12 cursor-pointer">
                    <i
                      className="hidden group-hover:flex justify-center text-small-text hover:text-white"
                      // onClick={() => openEditModal(index)}
                    >
                      <FaPen />
                    </i>
                  </div>
                  <div
                    className="w-8/12 cursor-pointer flex justify-between"
                    // onClick={() => openEditModal(index)}
                  >
                    <p className="text-sm leading-[16px] mr-1 text-md">
                      {title.length > 16
                        ? title.substring(0, 14) + '...'
                        : title}
                    </p>
                    <p className="text-sm leading-[16px] mr-1 text-md">
                      {formatAmPmDate(startTime)} - {formatAmPmDate(endTime)}
                    </p>
                  </div>
                  {/* <div className="w-2/12 cursor-pointer flex justify-center text-small-text hover:text-white">
                    {task.repeat === 'optionRepeat' && (
                      <i onClick={() => openRepeatDetailsModal(index)}>
                        <FaCalendarWeek />
                      </i>
                    )}
                  </div> */}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                Generate some tasks
              </div>
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              className="absolute bottom-10 left-0 right-0 m-auto rounded-xl w-[273px] h-[50px] bg-primary-200 text-center leading-[50px] font-medium text-lg hover:bg-primary-100 cursor-pointer"
            >
              Generate Schedule
            </button>
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
              <div className="grid grid-cols-2">
                <input
                  name="repeatGap"
                  min={1}
                  type="number"
                  value={repeat.repeatGap}
                  onChange={handleRepeatChange}
                  className="text-center"
                />
                <select
                  name="type"
                  value={repeat.type}
                  onChange={handleRepeatChange}
                  className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
            </div>
            {repeat.type === 'week' && (
              <div className="mb-4">
                <label className="block mb-2">Days:</label>
                <div className="flex space-x-2">
                  {dayMapping.map(({ value, label }) => (
                    <button
                      key={value}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        repeat.dayOfWeek.includes(value)
                          ? 'bg-primary-50 text-white'
                          : 'bg-[#262525] border border-primary-200'
                      }`}
                      onClick={() =>
                        setRepeat({
                          ...repeat,
                          dayOfWeek: [...repeat.dayOfWeek, value],
                        })
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2">End:</label>
              <select
                value={repeat.hasEndDate}
                name="hasEndDate"
                onChange={handleRepeatChange}
                className="w-full p-2 rounded bg-[#262525] border border-primary-200"
              >
                <option value={false}>Never</option>
                <option value={true}>On Date</option>
              </select>
            </div>
            {repeat.hasEndDate === 'true' && (
              <div className="mb-4">
                <label className="block mb-2">End Date:</label>
                <DatePicker
                  selected={repeat.endDate}
                  onChange={(date) => setRepeat({ ...repeat, endDate: date })}
                  className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                />
              </div>
            )}
            <button
              onClick={() => setIsRepeatOpen(!isRepeatOpen)}
              className="w-full mt-4 bg-primary-50 p-2 rounded text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {/* {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#262525] max-w-custom w-[420px] rounded-xl shadow-custom flex justify-center items-center">
            <div className="w-8/12 flex-col justify-center items-center">
              <div className="flex flex-col font-medium text-lg mt-8 items-center">
                <div className="mr-1">EDIT TASK</div>
                <div className="text-primary-50 text-center">
                  {formData.taskTitle}
                </div>
              </div>
              <form onSubmit={handleGenerateBtnClick}>
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
      )} */}

      {/* Repeat Details Modal */}
      {/* {isRepeatDetailsOpen && (
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
      )} */}
    </div>
  );
}
