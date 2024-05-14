import React from "react";
import { FaCalendar, FaWandMagicSparkles, FaGear } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col justify-center items-center w-10 h-full">
      <div className="flex flex-col justify-center items-center h-full text-[#929292] text-3xl">
        <a
          href="/"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === "/"
              ? "activeLink bg-[#232E30] text-[#00717F]"
              : ""
          }`}
        >
          <i>
            <FaCalendar />
          </i>
        </a>
        <a
          href="/ai-scheduler"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === "/ai-scheduler"
              ? "activeLink bg-[#232E30] text-[#00717F]"
              : ""
          }`}
        >
          <i>
            <FaWandMagicSparkles />
          </i>
        </a>
        <a
          href="/setting"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === "/setting"
              ? "activeLink bg-[#232E30] text-[#00717F]"
              : ""
          }`}
        >
          <i>
            <FaGear />
          </i>
        </a>
      </div>
      <div className="mt-auto mb-10">avatar</div>
    </aside>
  );
}
