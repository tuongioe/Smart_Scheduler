import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
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

export function getDayOfWeek(dayOfWeek = dayjs()){
  const firstDayOfWeek = dayOfWeek.startOf('week');
  const weekDays = Array.from({ length: 7 }, (_, index) => firstDayOfWeek.day(index+1));

  return weekDays;
}