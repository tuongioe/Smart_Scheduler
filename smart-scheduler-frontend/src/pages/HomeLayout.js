import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="mx-auto">
      <Outlet />
    </div>
  );
};
export default HomeLayout;
