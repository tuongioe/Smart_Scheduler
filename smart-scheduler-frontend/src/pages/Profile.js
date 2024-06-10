import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/User.css';
import axios from 'axios';

function generateTimeOptions() {
  const options = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Bắt đầu từ 00:00

  for (let i = 0; i < 96; i++) {
    // 96 khoảng thời gian 15 phút trong 24 giờ
    let hours = startTime.getHours();
    let minutes = startTime.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    const hours24 = hours; // Lưu giá trị 24 giờ
    hours = hours % 12;
    hours = hours ? hours : 12; // Chuyển đổi giờ 0 thành 12
    const minutesStr = minutes.toString().padStart(2, '0');
    const timeLabel = `${hours}:${minutesStr} ${ampm}`;
    const value24 = `${hours24}:${minutesStr}`;
    options.push(
      <option key={value24} value={value24}>
        {timeLabel}
      </option>
    );
    startTime.setMinutes(startTime.getMinutes() + 15); // Tăng thêm 15 phút
  }
  return options;
}

function convertTo12HourFormat(time24) {
  const [hour, minute] = time24.split(':');

  let hourInt = parseInt(hour, 10);

  const suffix = hourInt >= 12 ? 'pm' : 'am';

  hourInt = hourInt % 12 || 12;

  const hour12 = hourInt < 10 ? `0${hourInt}` : hourInt;
  const minuteStr = minute < 10 ? `0${minute}` : minute;

  const time12 = `${hour12}:${minuteStr}${suffix}`;

  return time12;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const timeOptions = generateTimeOptions();
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}api/user`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.data);
          setUser(response.data.data);
        } catch (e) {
          console.log(e);
        }
      }
    };

    verifyAuth();
  }, []);
  return (
    <div className="grid grid-cols-3 mt-[70px] gap-[30px] ">
      <aside className="col-span-1 rounded-3xl  overflow-hidden w-full shadow-2xl">
        <section className="relative flex flex-col items-center z-0 overflow-hidden  w-full h-[150px]  background pt-[40px] px-[40px] pb-[20px] ">
          <img
            src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg?w=1060&t=st=1718015495~exp=1718016095~hmac=36ca437cbf93b5ae6d9d5fff98b707055513b9ed3403d224ee6473fe2d80155c"
            alt=""
            className="w-[100px] h-[100px] rounded-full border-[5px] border-solid border-[#fff] absolute top-[50px] "
          />
        </section>
        <ul className="p-[30px] bg-[#262525]">
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-2xl font-bold text-[#00a9bf]">Information</h2>
            <p className="text-xl font-medium pl-[20px] text-[#00717f]">
              Username:{' '}
              <span className="font-bold text-white"> {user?.userName}</span>
            </p>
            <p className="text-xl font-medium text-[#00717f]  pl-[20px]">
              Email :
              <span className="font-bold  text-white "> {user?.email}</span>
            </p>
          </div>
        </ul>
      </aside>
      <div
        className="col-span-2 w-full rounded-[20px] p-[30px]"
        style={{
          backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)',
        }}
      >
        <form>
          <button
            type="submit"
            className="w-[200px] p-[20px] rounded-[10px] text-xl font-bold  shadow-xl"
            style={{
              backgroundImage: 'linear-gradient(to left, #00717F, #00777F)',
            }}
          >
            Create
          </button>
          <div className="Activity__Block">
            <div className="Activity__Name">Breakfast</div>
            <div className="Activity__Start">
              <select id="breakfast-start">{timeOptions}</select>
            </div>
          </div>
          <div className="Activity__Block">
            <div className="Activity__Name">Lunch</div>
            <div className="Activity__Start">
              <select id="lunch-start">{timeOptions}</select>
            </div>
          </div>
          <div className="Activity__Block">
            <div className="Activity__Name">Dinner</div>
            <div className="Activity__Start">
              <select id="dinner-start">{timeOptions}</select>
            </div>
          </div>
          {/* <div className="Activity__Block">
          <div className="Activity__Name">Work/Study</div>
          <div className="Activity__Start">
            <select id="work-start">{timeOptions}</select>
          </div>
        </div> */}
          <div className="Activity__Block">
            <div className="Activity__Name">Take a shower</div>
            <div className="Activity__Start">
              <select id="shower-start">{timeOptions}</select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
