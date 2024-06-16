import React from 'react';
import dayjs from 'dayjs';

const GlobalContext = React.createContext({
  currentDayFrame: dayjs(),
  setCurrentDayFrame: () => {},
  currentYear: dayjs(),
  setCurrentYear: () => {},
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
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
  filteredEvents: [],
  frame: 'month',
  setFrame: () => {},
  deleteLabel: () => {},
  updateLocalStorage: () => {},
  labelSelected: null,
  setLabelSelected: () => {},
  allTime: [Array.from({ length: 25 }, (_, index) => index)],
});

export default GlobalContext;
