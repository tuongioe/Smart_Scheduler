import React, { useState } from "react";
import { FaGripLines, FaCalendarWeek } from "react-icons/fa6";

export default function AIScheduler() {
  // Khai báo state để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    taskTitle: "",
    estimateTime: "30 min",
    taskType: "health",
    repeat: "1",
    taskNote: "",
  });

  // Khai báo state kiểu mảng để lưu trữ dữ liệu form đã nộp
  const [submittedData, setSubmittedData] = useState([]);

  // Khai báo state để quản lý trạng thái modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Khai báo state để lưu trữ chỉ số của task đang được chỉnh sửa
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Hàm để mở modal
  const openModal = (index) => {
    setCurrentTaskIndex(index);
    setFormData(submittedData[index]);
    setIsModalOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTaskIndex(null);
  };

  // Hàm để cập nhật state khi người dùng thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm để xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTaskIndex !== null) {
      // Update the existing task
      const updatedData = [...submittedData];
      updatedData[currentTaskIndex] = formData;
      setSubmittedData(updatedData);
    } else {
      // Add new task
      setSubmittedData([...submittedData, formData]);
    }
    // Reset form về trạng thái ban đầu
    setFormData({
      taskTitle: "",
      estimateTime: "30 min",
      taskType: "health",
      repeat: "1",
      taskNote: "",
    });
    // Đóng modal nếu form được submit từ modal
    closeModal();
  };

  // Hàm để xử lý khi nút delete được nhấn
  const handleDelete = (e) => {
    e.preventDefault();
    const updatedData = submittedData.filter(
      (_, index) => index !== currentTaskIndex
    );
    setSubmittedData(updatedData);
    closeModal();
  };

  return (
    <div className="">
      <div className="mt-0 flex flex-col md:flex-row items-center md:justify-around md:items-start md:mt-20">
        <div className="w-[273px] h-auto">
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
                <option value="30 min">30 min</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="5 hours">5 hours</option>
                <option value="12 hours">12 hours</option>
                <option value="1 day">1 day</option>
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
                onChange={handleChange}
                value={formData.taskNote}
                className="rounded-xl w-[273px] h-[50px] bg-[#262525] border border-primary-200 pl-5 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-[30px] rounded-xl w-[273px] h-[50px] bg-[#262525] border border-primary-200 border-1 focus:outline-none text-center leading-[50px] font-medium text-lg hover:bg-primary-100 md:mt-[50px]"
            >
              Add task
            </button>
          </form>
        </div>
        <div className="w-[346px] h-auto mt-20 md:mt-0">
          <div className="flex justify-center">
            <div className="mr-2 text-[22px] font-bold leading-[25.2px] text-center">
              Generate schedule for
            </div>
            <div className="text-[22px] text-primary-50 font-bold leading-[25.2px] text-center cursor-pointer">
              today
            </div>
          </div>
          <div className="mt-[50px] w-[346px] h-[526px] border border-primary-200 rounded-xl relative">
            {submittedData.length > 0 ? (
              submittedData.map((task, index) => (
                <div
                  key={index}
                  className={`group py-5 flex hover:bg-[#373636] ${
                    index === 0 ? "rounded-t-xl" : ""
                  }`}
                >
                  <div className="w-2/12 cursor-pointer">
                    <i
                      className="hidden group-hover:flex justify-center"
                      onClick={() => openModal(index)}
                    >
                      <FaGripLines />
                    </i>
                  </div>
                  <div className="flex w-8/12">
                    <p className="text-sm font-light leading-[16px] mr-1 w-6/12">
                      {task.taskTitle.length > 16
                        ? task.taskTitle.substring(0, 14) + "..."
                        : task.taskTitle}
                    </p>
                    <p className="text-sm font-light leading-[16px] mr-1 w-6/12">
                      6:30am - 7:00am
                    </p>
                  </div>
                  <div className="w-2/12 text-[#B02D2D] cursor-pointer">
                    <i
                      className="hidden group-hover:flex justify-center"
                      onClick={() => openModal(index)}
                    >
                      <FaCalendarWeek />
                    </i>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm font-light leading-[16px] mt-5 ml-5">
                No task submitted yet.
              </p>
            )}
            <div className="absolute bottom-10 left-0 right-0 m-auto rounded-xl w-[273px] h-[50px] bg-primary-200 text-center leading-[50px] font-medium text-lg hover:bg-primary-100 cursor-pointer">
              Generate Schedule
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal fixed inset-0 justify-center items-center ${
          isModalOpen ? "flex" : "hidden"
        }`}
      >
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
                  <option value="30 min">30 min</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="5 hours">5 hours</option>
                  <option value="12 hours">12 hours</option>
                  <option value="1 day">1 day</option>
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
                  <option value="1">1time/day</option>
                  <option value="2">2time/day</option>
                  <option value="3">3time/day</option>
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
    </div>
  );
}
