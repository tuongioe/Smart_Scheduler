import React from 'react';
import dayjs from 'dayjs';

const GlobalContext = React.createContext({
  currentDayFrame: dayjs(),
  setCurrentDayFrame: () => {},
  currentYear: dayjs().year(),
  setCurrentYear: () => {},
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
  updateEventDate: () => {},
  addEventDate: () => {},
  filteredEvents: [],
  setEventDates: () => [],
  frame: 'month',
  setFrame: () => {},
});

export default GlobalContext;