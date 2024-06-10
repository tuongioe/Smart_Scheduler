import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen md:flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
