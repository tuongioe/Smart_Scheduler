import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalendar, FaWandMagicSparkles, FaGear } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

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
        >
          <i>
            <FaWandMagicSparkles />
          </i>
        </NavLink>
        <NavLink
          to="setting"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === '/dashboard/setting'
              ? 'activeLink bg-[#232E30] text-primary'
              : ''
          }`}
        >
          <i>
            <FaGear />
          </i>
        </NavLink>
      </div>
      <div className="mt-auto mb-10">avatar</div>
    </aside>
  );
}
