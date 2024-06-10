import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  dayMapping,
  timeOptions,
  estimateTimeOptions,
} from '../utils/renderArr';
import {
  formatAmPmDate,
  toISOWithoutZ,
  createDateTimeWithSpecificTime,
  convertToTimeString,
} from '../utils/dateFormat';
import {
  createManyTasks,
  generateTask,
  getAllCalendars,
} from '../apis/generate';
import { toast } from 'react-toastify';
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
  const [editingRepeat, setEditingRepeat] = useState({
    type: 'day',
    repeatGap: '1',
    dayOfWeek: [],
    endDate: new Date(),
    hasEndDate: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [isRepeatOpen, setIsRepeatOpen] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditingTaskChange = (e) => {
    console.log(editingTask);
    setEditingTask({
      ...editingTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleRepeatChange = (e) => {
    setRepeat({
      ...repeat,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditingRepeatChange = (e) => {
    setEditingRepeat({
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
        dayOfWeek: repeat.type === 'week' ? repeat.dayOfWeek : null,
      };
      if (repeat.hasEndDate === 'true')
        cleanRepeat.endDate = toISOWithoutZ(repeat.endDate);
      request.repeat = cleanRepeat;
    }
    const task = await generateTask(request);
    console.log(task);
    setGeneratedTasks([...generatedTasks, task]);
    setFormData({
      title: '',
      estimatedTime: '30',
      calendarId: calendars[0].id,
      description: '',
      isRecurring: false,
    });
    setRepeat({
      type: 'day',
      repeatGap: '1',
      dayOfWeek: [],
      endDate: new Date(),
      hasEndDate: false,
    });
    toast.success('Task generated successfully');
    setIsLoading(false);
  };

  const handleTaskClick = (index) => {
    setIsEditOpen(true);
    setEditingTask({
      ...generatedTasks[index],
      index,
      startTime: convertToTimeString(generatedTasks[index].startTime),
      endTime: convertToTimeString(generatedTasks[index].endTime),
    });
    if (generatedTasks[index].repeat) {
      setEditingRepeat({
        ...generatedTasks[index].repeat,
        hasEndDate: generatedTasks[index].repeat.endDate && 'true',
      });
    }
  };

  const handleSaveEditBtnClick = () => {
    const { title, calendarId, description, startTime, endTime, isRecurring } =
      editingTask;

    const request = {
      title,
      calendarId,
      description,
      startTime: createDateTimeWithSpecificTime(startTime),
      endTime: createDateTimeWithSpecificTime(endTime),
      isRecurring,
    };
    if (isRecurring === 'true' || isRecurring === true) {
      const cleanRepeat = {
        type: editingRepeat.type,
        repeatGap: editingRepeat.repeatGap,
        dayOfWeek:
          editingRepeat.type === 'week' ? editingRepeat.dayOfWeek : null,
      };
      if (
        editingRepeat.hasEndDate === 'true' ||
        editingRepeat.hasEndDate === true
      )
        cleanRepeat.endDate = toISOWithoutZ(editingRepeat.endDate);
      request.repeat = cleanRepeat;
    }
    const editedTasks = generatedTasks.map((_, index) => {
      if (index === editingTask.index) return request;
    });
    console.log(editedTasks);
    setGeneratedTasks(editedTasks);
    setIsEditOpen(false);
    setEditingRepeat({
      type: 'day',
      repeatGap: '1',
      dayOfWeek: [],
      endDate: new Date(),
      hasEndDate: false,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const createdTasks = await createManyTasks(generatedTasks);
    console.log(createdTasks);
    setGeneratedTasks([]);
    toast.success('Save all tasks successfully');
    setIsLoading(false);
  };

  const fetchCalendars = async () => {
    const { data } = await getAllCalendars();
    console.log(data);
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
                  onClick={() => handleTaskClick(index)}
                  key={index}
                  className={`group py-5 flex justify-center cursor-pointer hover:bg-[#373636] ${
                    index === 0 ? 'rounded-t-xl' : ''
                  }`}
                >
                  <div className="w-8/12 flex justify-between">
                    <p className="text-sm leading-[16px] mr-1 text-md">
                      {title.length > 16
                        ? title.substring(0, 14) + '...'
                        : title}
                    </p>
                    <p className="text-sm leading-[16px] mr-1 text-md">
                      {formatAmPmDate(startTime)} - {formatAmPmDate(endTime)}
                    </p>
                  </div>
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
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#262525] max-w-custom w-[420px] rounded-xl shadow-custom flex justify-center items-center">
            <div className="w-8/12 flex-col justify-center items-center">
              <div className="flex flex-col font-medium text-lg mt-8 items-center">
                <label className="mr-1">Edit task</label>
                <input
                  className="text-primary-50 text-center"
                  value={editingTask.title}
                  name="title"
                  onChange={handleEditingTaskChange}
                />
              </div>
              <div>
                {/* Start time */}
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label className="text-lg font-medium">Start time</label>
                  <select
                    name="startTime"
                    required
                    onChange={handleEditingTaskChange}
                    value={editingTask.startTime}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:w-[123px] md:h-[38px]"
                  >
                    {timeOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* End time */}
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label className="text-lg font-medium">End time</label>
                  <select
                    name="endTime"
                    required
                    onChange={handleEditingTaskChange}
                    value={editingTask.endTime}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:w-[123px] md:h-[38px]"
                  >
                    {timeOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Calendar */}
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label className="text-lg font-medium">Calendar</label>
                  <select
                    name="calendarId"
                    required
                    onChange={handleEditingTaskChange}
                    value={editingTask.calendarId}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:w-[123px] md:h-[38px]"
                  >
                    {calendars.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-[30px] w-full h-[60px] flex flex-col items-center md:flex-row md:justify-between md:h-[38px]">
                  <label className="text-lg font-medium">Repeat</label>
                  <select
                    name="isRecurring"
                    required
                    onChange={handleEditingTaskChange}
                    value={editingTask.isRecurring}
                    className="w-full h-[60px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none rounded-xl text-small-text float-right md:w-[134px] md:h-[38px]"
                  >
                    <option value="false">No repeat</option>
                    <option value="true">Option...</option>
                  </select>
                </div>
                {/* Edit Repeat */}
                {(editingTask.isRecurring === true ||
                  editingTask.isRecurring === 'true') && (
                  <div className="mt-2">
                    <div className="mb-4">
                      <div className="grid grid-cols-2">
                        <input
                          name="repeatGap"
                          min={1}
                          type="number"
                          value={editingRepeat.repeatGap}
                          onChange={handleEditingRepeatChange}
                          className="text-center"
                        />
                        <select
                          name="type"
                          value={editingRepeat.type}
                          onChange={handleEditingRepeatChange}
                          className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                        >
                          <option value="day">Day</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </select>
                      </div>
                    </div>
                    {editingRepeat.type === 'week' && (
                      <div className="mb-4">
                        <label className="block mb-2">Days:</label>
                        <div className="flex space-x-2">
                          {dayMapping.map(({ value, label }) => (
                            <button
                              key={value}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                editingRepeat.dayOfWeek.includes(value)
                                  ? 'bg-primary-50 text-white'
                                  : 'bg-[#262525] border border-primary-200'
                              }`}
                              onClick={() =>
                                setEditingRepeat({
                                  ...editingRepeat,
                                  dayOfWeek: [
                                    ...editingRepeat.dayOfWeek,
                                    value,
                                  ],
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
                      <label className="block mb-2">End</label>
                      <select
                        value={editingRepeat.hasEndDate}
                        name="hasEndDate"
                        onChange={handleEditingRepeatChange}
                        className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                      >
                        <option value={false}>Never</option>
                        <option value={true}>On Date</option>
                      </select>
                    </div>
                    {editingRepeat.hasEndDate === 'true' && (
                      <div className="mb-4">
                        <label className="block mb-2">End Date</label>
                        <DatePicker
                          selected={editingRepeat.endDate}
                          onChange={(date) =>
                            setEditingRepeat({
                              ...editingRepeat,
                              endDate: date,
                            })
                          }
                          className="w-full p-2 rounded bg-[#262525] border border-primary-200"
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-[50px] relative md:mt-[30px]">
                  <div className="absolute -top-5 left-4 text-lg font-medium bg-[#262525] p-1 ">
                    Description
                  </div>
                  <input
                    name="description"
                    placeholder="Enter description here"
                    onChange={handleEditingTaskChange}
                    value={editingTask.description}
                    className="rounded-xl w-full h-[50px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
                  />
                </div>
                <div className="my-[30px] w-full flex justify-around">
                  <button
                    type="button"
                    className="rounded-xl w-5/12 h-[50px] bg-[#b02d2d] opacity-90 focus:outline-none text-center leading-[50px] font-medium text-lg hover:opacity-100"
                    onClick={() => {
                      setGeneratedTasks(
                        generatedTasks.filter(
                          (_, taskIndex) => taskIndex !== editingTask.index
                        )
                      );
                      setIsEditOpen(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEditBtnClick}
                    className="rounded-xl w-5/12 h-[50px] bg-primary-200 focus:outline-none text-center leading-[50px] font-medium text-lg hover:bg-primary-100"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
