import React from "react";
import { FaCalendar, FaWandMagicSparkles, FaGear } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex md:flex-col justify-center items-center md:w-10 h-full">
      <div className="flex md:flex-col justify-center items-center h-full text-[#929292] text-2xl">
        <a
          href="/calendar"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === "/calendar"
              ? "activeLink bg-[#232E30] text-primary"
              : ""
          }`}
          style={{ transform: "scale(1.3)" }}
        >
          <i>
            <FaCalendar />
          </i>
        </a>
        <a
          href="/ai-scheduler"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === "/ai"
              ? "activeLink bg-[#232E30] text-primary"
              : ""
          }`}
          style={{ transform: "scale(1.3)" }}
        >
          <i>
            <FaWandMagicSparkles />
          </i>
        </a>
        <a
          href="/setting"
          className={`mb-6 p-3 rounded-xl ${
            location.pathname === "/setting"
              ? "activeLink bg-[#232E30] text-primary"
              : ""
          }`}
          style={{ transform: "scale(1.3)" }}
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
