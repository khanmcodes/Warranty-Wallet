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
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 justify-center items-center">
      <div className="bg-darkBg-800/80 backdrop-blur-lg border border-borderColor w-auto justify-center items-center rounded-2xl px-8 sm:px-4 py-1.5 sm:py-2 shadow-dark-lg">
        <div className="flex items-center justify-center space-x-1 sm:space-x-2 hover:space-x-2 sm:hover:space-x-4 transition-all duration-200">
          <img src={logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <div className="h-6 sm:h-8 w-px bg-borderColor mx-0.5 sm:mx-1"></div>
          <button
            onClick={onShowAllClick}
            className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 ${
              activeFilter === "all" && currentFilter !== "expiring"
                ? "bg-gradient-primary text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="All Warranties"
          >
            <TbLayoutDashboardFilled className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={onShowExpiringClick}
            className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 ${
              activeFilter === "expiring" || (activeFilter === "all" && currentFilter === "expiring")
                ? "bg-gradient-warning text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="Expiring Soon"
          >
            <TbClockExclamation className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={onShowExpiredClick}
            className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 ${
              activeFilter === "expired"
                ? "bg-gradient-error text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="Expired"
          >
            <TbClockX className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={onAddWarrantyClick}
            className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
              activeFilter === "add"
                ? "bg-gradient-accent text-white"
                : "text-darkText hover:bg-darkBg-700"
            }`}
            title="Add Warranty"
          >
            <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="h-6 sm:h-8 w-px bg-borderColor mx-0.5 sm:mx-1"></div>

          <button
            onClick={onLogout}
            className="p-2 sm:p-3 rounded-xl text-red-400 hover:bg-darkBg-700 transition-all duration-200"
            title="Logout"
          >
            <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dock;
