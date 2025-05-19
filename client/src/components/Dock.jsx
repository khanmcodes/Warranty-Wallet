import React from 'react';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { TbLayoutDashboardFilled, TbClockExclamation, TbClockX  } from "react-icons/tb";
import logo from '../assets/logo.png';

function Dock({ 
  onAddWarrantyClick,
  onShowExpiredClick,
  onShowExpiringClick,
  onShowAllClick,
  activeFilter,
  currentFilter,
  onLogout
}) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-darkBg-800/80 backdrop-blur-lg border border-borderColor rounded-2xl px-4 py-2 shadow-dark-lg">
        <div className="flex items-center space-x-2 hover:space-x-4 transition-all duration-200">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <div className="h-8 w-px bg-borderColor mx-1"></div>
          <button
            onClick={onShowAllClick}
            className={`p-2 rounded-xl transition-all duration-200 ${
              activeFilter === "all" && currentFilter !== "expiring"
                ? "bg-gradient-primary text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="All Warranties"
          >
            <TbLayoutDashboardFilled className="w-7 h-7" />
          </button>

          <button
            onClick={onShowExpiringClick}
            className={`p-2 rounded-xl transition-all duration-200 ${
              activeFilter === "expiring" || (activeFilter === "all" && currentFilter === "expiring")
                ? "bg-gradient-warning text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="Expiring Soon"
          >
            <TbClockExclamation className="w-7 h-7" />
          </button>

          <button
            onClick={onShowExpiredClick}
            className={`p-2 rounded-xl transition-all duration-200 ${
              activeFilter === "expired"
                ? "bg-gradient-error text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="Expired"
          >
            <TbClockX className="w-7 h-7" />
          </button>

          <button
            onClick={onAddWarrantyClick}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeFilter === "add"
                ? "bg-gradient-accent text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="Add Warranty"
          >
            <FaPlus className="w-5 h-5" />
          </button>

          <div className="h-8 w-px bg-borderColor mx-1"></div>

          <button
            onClick={onLogout}
            className="p-3 rounded-xl text-red-400 hover:bg-darkBg-700 transition-all duration-200"
            title="Logout"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
