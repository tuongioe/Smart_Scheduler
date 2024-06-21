import React from 'react';
import '../assets/User.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

function SurveyPage() {
  const navigate = useNavigate();
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
          if (response.data.data.surveyTasks.length > 0) {
            navigate('/dashboard');
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    verifyAuth();
  }, []);

  const timeOptions = generateTimeOptions();

  const surveyHandler = async (e) => {
    e.preventDefault();

    const breakfast = e.target.elements['breakfast-start'].value;
    const lunch = e.target.elements['lunch-start'].value;
    const dinner = e.target.elements['dinner-start'].value;
    const shower = e.target.elements['shower-start'].value;
    const data = [
      { title: 'Breakfast', startTime: convertTo12HourFormat(breakfast) },
      { title: 'Do Exercise', startTime: convertTo12HourFormat(lunch) },
      { title: 'Work', startTime: convertTo12HourFormat(dinner) },
      { title: 'Taking shower', startTime: convertTo12HourFormat(shower) },
    ];

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/survey`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="Survey__Block"
        style={{
          backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)',
        }}
      >
        <div className="survey__block__head">
          <h1>Survey</h1>
          <p>Take a survey to help us know more about your daily routine</p>
        </div>
        <form onSubmit={surveyHandler}>
          <div className="Activity__Block">
            <div className="Activity__Name">Do Exercise</div>
            <div className="Activity__Start">
              <select id="breakfast-start">{timeOptions}</select>
            </div>
          </div>
          <div className="Activity__Block">
            <div className="Activity__Name">Work</div>
            <div className="Activity__Start">
              <select id="lunch-start">{timeOptions}</select>
            </div>
          </div>
          <div className="Activity__Block">
            <div className="Activity__Name">Taking shower</div>
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
            <div className="Activity__Name">Breakfast</div>
            <div className="Activity__Start">
              <select id="shower-start">{timeOptions}</select>
            </div>
          </div>
          {/* <Link to="/"> */}
          <button
            type="submit"
            style={{
              backgroundImage: 'linear-gradient(to left, #00717F, #00777F)',
            }}
          >
            Save
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}

export default SurveyPage;
