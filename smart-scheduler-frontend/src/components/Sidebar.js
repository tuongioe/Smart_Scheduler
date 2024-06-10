import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalendar, FaWandMagicSparkles, FaGear } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';

export default function Sidebar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <aside className="flex md:flex-col justify-center items-center md:w-10 h-full">
      <div className="flex md:flex-col justify-center items-center h-full text-[#929292] text-3xl">
        <NavLink
          to="/dashboard"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === '/dashboard'
              ? 'activeLink bg-[#232E30] text-primary'
              : ''
          }`}
          style={{ transform: 'scale(1.3)' }}
        >
          <i>
            <FaCalendar />
          </i>
        </NavLink>
        <NavLink
          to="generate"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === '/dashboard/generate'
              ? 'activeLink bg-[#232E30] text-primary'
              : ''
          }`}
          style={{ transform: 'scale(1.3)' }}
        >
          <i>
            <FaWandMagicSparkles />
          </i>
        </NavLink>
        <NavLink
          to="profile"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === '/dashboard/profile'
              ? 'activeLink bg-[#232E30] text-primary'
              : ''
          }`}
          style={{ transform: 'scale(1.3)' }}
        >
          <i>
            <FaUser />
          </i>
        </NavLink>
      </div>

      <button className="mt-auto mb-10 " onClick={logout}>
        <i className="text-rose-700">
          <CiLogout className=" w-[30px] h-[30px]" />
        </i>
      </button>
    </aside>
  );
}
