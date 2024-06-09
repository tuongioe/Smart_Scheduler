import dayjs from 'dayjs';
import axios from 'axios';

export function getMonth(day = dayjs()) {
  const month = Math.floor(day.month());
  const year = day.year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getDayOfWeek(dayOfWeek = dayjs()) {
  const firstDayOfWeek = dayOfWeek.startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    firstDayOfWeek.day(index + 1)
  );
  return weekDays;
}

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
    (config) => {
          const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

