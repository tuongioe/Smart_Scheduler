import React from 'react';
import dayjs from 'dayjs';

const GlobalContext = React.createContext({
  currentDayFrame: dayjs(),
  setCurrentDayFrame: () => {},
  currentYear: dayjs().year(),
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventAddLabelModel: false,
  setShowEventAddLabelModelModal: () => {},
  showEventAddDateModel: false,
  setShowEventAddDateModel: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  addLabel: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labelClasses: [],
  setLabelClasses: [],
  labels: [],
  updateLabel: () => {},
  eventDates: [],
  addEventDate: () => {},
  filteredEvents: [],
  frame: 'month',
  setFrame: () => {},
});

export default GlobalContext;
