export const formatAmPmDate = (data) => {
  const date = new Date(data);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const toISOWithoutZ = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
export const createDateTimeWithSpecificTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  // Get today's date
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Months are zero-based
  const day = today.getDate();

  // Create a new Date object with today's date and the specific time
  const dateTime = new Date(year, month, day, hours, minutes, 0);

  return toISOWithoutZ(dateTime);
};

export const convertToTimeString = (dateTimeString) => {
  // Parse the DateTime string to a Date object
  const date = new Date(dateTimeString);

  // Extract hours and minutes
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Combine hours and minutes into the desired format
  const timeString = `${hours}:${minutes}`;

  return timeString;
};
