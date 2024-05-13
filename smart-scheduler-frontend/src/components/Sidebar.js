import React from "react";
import { FaCalendar, FaWandMagicSparkles, FaGear } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-center items-center w-10 h-full">
      <div className="flex flex-col justify-center items-center h-full text-[#929292] text-4xl">
        <a href="/" className="mb-6">
          <i>
            <FaCalendar />
          </i>
        </a>
        <a href="/ai-scheduler" className="mb-6">
          <i>
            <FaWandMagicSparkles />
          </i>
        </a>
        <a href="/setting" className="mb-6">
          <i>
            <FaGear />
          </i>
        </a>
      </div>
      <div className="mt-auto mb-10">avatar</div>
    </aside>
  );
}
