import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:h-screen">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default HomeLayout;
