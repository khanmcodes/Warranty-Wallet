import { useState } from "react";
import logo from "../assets/logo.png";

export default function Sidebar({
  onAddWarrantyClick,
  onShowExpiredClick,
  onShowExpiringClick,
  onShowAllClick,
  activeFilter,
  currentFilter,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu toggle button - only visible on small screens */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed z-30 top-4 left-4 md:hidden bg-darkBg-800 p-2 rounded-md shadow-dark text-darkText"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-darkText"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed md:static h-screen bg-gradient-dark border-r border-borderColor shadow-dark transition-all duration-300 z-20
        w-64 md:w-64
        ${isMobileMenuOpen ? "left-0" : "-left-full md:left-0"}`}
      >
        {/* Logo and title */}
        <div className="flex flex-col items-center pt-6 pb-8">
          <img
            src={logo}
            alt="Warranty Wallet Logo"
            className="w-16 h-16 object-contain drop-shadow-lg"
          />
          <h1 className="mt-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0f0f0] to-[#d1d1d1]">
            <span className="font-sans font-black text-xl text-white">
              Warranty
            </span>
            <span className="font-sans font-thin text-xl text-white">
              Wallet
            </span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  onShowAllClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
                  activeFilter === "all" && currentFilter !== "expiring"
                    ? "bg-gradient-primary text-[#1e293b] shadow-glow-primary"
                    : "text-darkText hover:bg-darkBg-700 "
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                All Warranties
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onShowExpiringClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
                  activeFilter === "expiring" ||
                  (activeFilter === "all" && currentFilter === "expiring")
                    ? "bg-gradient-warning text-white shadow-glow-primary"
                    : "text-darkText hover:bg-darkBg-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Expiring Soon
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onShowExpiredClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
                  activeFilter === "expired"
                    ? "bg-gradient-error text-white shadow-glow-primary"
                    : "text-darkText hover:bg-darkBg-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Expired
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onAddWarrantyClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all ${
                  activeFilter === "add"
                    ? "bg-gradient-accent text-white shadow-glow-primary"
                    : "text-darkText hover:bg-darkBg-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Warranty
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout at the bottom */}
        <div className="absolute bottom-4 px-4 w-64">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center py-2 px-3 text-red-400 hover:bg-darkBg-700 rounded-lg w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
