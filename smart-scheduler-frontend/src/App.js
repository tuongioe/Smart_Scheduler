import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RegisterPage from './RegisterPage.js';
import LoginPage from './LoginPage.js';
function App() {
  // const [currenMonth, setCurrentMonth] = useState(getMonth());
  // const {
  //   showEventAddDateModel,
  //   showEventAddLabelModel,
  //   frame,
  //   currentDayFrame,
  // } = useContext(GlobalContext);

  // useEffect(() => {
  //   setCurrentMonth(getMonth(currentDayFrame));
  // }, [currentDayFrame]);

  let content;

  // switch (frame) {
  //   case 'month':
  //     content = <MonthFrame month={currenMonth} />;
  //     break;
  //   case 'week':
  //     content = <WeekFrame />;
  //     break;
  //   case 'day':
  //     content = <DayFrame />;
  //     break;
  //   default:
  //     content = <div>Invalid frame</div>;
  // }

  return (
    <React.Fragment>
      <div className="container mx-auto md:max-w-[1024px]">
        <div className="flex flex-col md:flex-row md:h-screen">
          <div className="w-full md:w-10/12">
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </div>
          {/* <aside className="p-5 w-64">
            <SmallCalendar />
            <Labels />
          </aside> */}
          {content}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
