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
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      }
    };

    verifyAuth();
  }, []);

  const timeOptions = generateTimeOptions();

  return (
    <div
      className="Survey__Block"
      style={{ backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)' }}
    >
      <div>
        <h1>Survey</h1>
        <p>Take a survey to help us know more about your daily routine</p>
      </div>
      <div>
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
        <div className="Activity__Block">
          <div className="Activity__Name">Work/Study</div>
          <div className="Activity__Start">
            <select id="work-start">{timeOptions}</select>
          </div>
        </div>
        <div className="Activity__Block">
          <div className="Activity__Name">Take a shower</div>
          <div className="Activity__Start">
            <select id="shower-start">{timeOptions}</select>
          </div>
        </div>
      </div>
      <Link to="/">
        <button
          style={{
            backgroundImage: 'linear-gradient(to left, #00717F, #00777F)',
          }}
        >
          Save
        </button>
      </Link>
    </div>
  );
}

export default SurveyPage;
