import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen gap-[20px]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default Dashboard;
