import { useEffect, useState } from "react";
import API from "../../axios";
import WarrantyForm from "../components/WarrantyForm";
import WarrantyList from "../components/WarrantyList";
import Dock from "../components/Dock";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import Loader from "../components/Loader";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [filteredWarranties, setFilteredWarranties] = useState([]);
  const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filters, setFilters] = useState({
    search: "",
    status: "valid",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for token in URL (from Google auth)
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      // Remove token from URL
      window.history.replaceState({}, document.title, '/dashboard');
    }
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    const fetchWarranties = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/warranties");
        setWarranties(res.data);
        setFilteredWarranties(res.data);
      } catch (error) {
        console.error("Failed to fetch warranties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
    fetchWarranties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [warranties, filters, activeFilter]);

  const getExpiryDate = (warranty) => {
    const expiry = new Date(warranty.purchaseDate);
    expiry.setMonth(expiry.getMonth() + warranty.durationMonths);
    return expiry;
  };

  const getDaysRemaining = (warranty) => {
    const expiry = getExpiryDate(warranty);
    const now = new Date();
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const applyFilters = () => {
    let result = [...warranties];
    const now = new Date();

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (w) =>
          w.productName.toLowerCase().includes(searchTerm) ||
          w.brand.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status !== "all") {
      if (filters.status === "valid") {
        result = result.filter((w) => {
          const expiry = getExpiryDate(w);
          return expiry > now;
        });
      } else if (filters.status === "expired") {
        result = result.filter((w) => {
          const expiry = getExpiryDate(w);
          return expiry < now;
        });
      } else if (filters.status === "expiring") {
        result = result.filter((w) => {
          const daysRemaining = getDaysRemaining(w);
          return daysRemaining > 0 && daysRemaining <= 30;
        });
      }
    }

    if (filters.status === "expiring" || filters.status === "valid") {
      result.sort((a, b) => {
        const expiryA = getExpiryDate(a);
        const expiryB = getExpiryDate(b);
        return expiryA - expiryB;
      });
    }

    setFilteredWarranties(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleAdd = (newWarranty) => {
    setWarranties([newWarranty, ...warranties]);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setWarranties(warranties.filter((w) => w._id !== id));
  };

  const handleAddWarrantyClick = () => {
    setShowAddForm(true);
    setActiveFilter("add");
  };

  const handleShowExpiredClick = () => {
    setFilters({ ...filters, status: "expired" });
    setActiveFilter("expired");
    setShowAddForm(false);
  };

  const handleShowExpiringClick = () => {
    setFilters({ ...filters, status: "expiring" });
    setActiveFilter("expiring");
    setShowAddForm(false);
  };

  const handleShowAllClick = () => {
    setFilters({ ...filters, status: "valid" });
    setActiveFilter("all");
    setShowAddForm(false);
  };

  const handleLogout = () => {
    setLogoutConfirmModal(true);
  };

  return (
    <div className="min-h-screen bg-darkBg-900 text-darkText">
      <Dock
        onAddWarrantyClick={handleAddWarrantyClick}
        onShowExpiredClick={handleShowExpiredClick}
        onShowExpiringClick={handleShowExpiringClick}
        onShowAllClick={handleShowAllClick}
        activeFilter={activeFilter}
        currentFilter={filters.status}
        onLogout={handleLogout}
      />

      <div className="w-full flex justify-center items-center bg-gradient-primary2 py-1">
        <img src={logo} alt="logo" className="w-7 h-7" />
      </div>

      <div className="p-4 md:p-6 mt-10 mx-0 xl:mx-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-primary items-center justify-center flex text-2xl font-bold text-white">
                  {user ? user.name.charAt(0).toUpperCase() : ""}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Welcome{user ? `, ${user.name}` : ""}! 👋
                </h1>
              </div>
            </div>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Manage your product warranties in one place
            </p>
          </div>
        </header>

        <main>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader/>
            </div>
          ) : showAddForm ? (
            <WarrantyForm
              onAdd={handleAdd}
              onCancel={() => {
                setShowAddForm(false);
                setActiveFilter("all");
              }}
            />
          ) : (
            <>
              <div className="flex flex-col mb-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-lg md:text-xl font-bold">
                      {activeFilter === "expired"
                        ? "Expired Warranties"
                        : activeFilter === "add"
                        ? "Add Warranty"
                        : filters.status === "expiring"
                        ? "Expiring Soon"
                        : "Your Warranties"}
                      {filteredWarranties.length > 0 && (
                        <span className="ml-2 text-gray-400 text-base font-normal">
                          ({filteredWarranties.length})
                        </span>
                      )}
                    </h2>
                    {activeFilter === "all" && filters.status !== "expiring" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setFilters({ ...filters, status: "valid" });
                            setActiveFilter("all");
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            filters.status === "valid"
                              ? "bg-gradient-primary text-white"
                              : "bg-darkBg-800 text-darkText hover:bg-darkBg-700"
                          }`}
                        >
                          Valid
                        </button>
                        <button
                          onClick={() => {
                            setFilters({ ...filters, status: "all" });
                            setActiveFilter("all");
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            filters.status === "all"
                              ? "bg-gradient-primary text-white"
                              : "bg-darkBg-800 text-darkText hover:bg-darkBg-700"
                          }`}
                        >
                          View All
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative w-full md:w-64 mt-4 md:mt-0">
                    <input
                      type="text"
                      placeholder="Search product or brand..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange({ search: e.target.value })}
                      className="w-full px-4 py-2 pl-10 bg-darkBg-800 border border-borderColor rounded-full focus:outline-none focus:ring-3 focus:ring-primary"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <WarrantyList
                warranties={filteredWarranties}
                onDelete={handleDelete}
              />
            </>
          )}
        </main>
        {logoutConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-50">
            <div className="bg-darkBg-800 p-8 rounded-lg shadow-dark border border-borderColor">
              <div className="flex items-center gap-2 mb-4">
                <FaSignOutAlt className="w-6 h-6 text-red-500" />
                <h2 className="text-lg font-semibold text-darkText">
                  Confirm Logout
                </h2>
              </div>
              <p className="text-gray-400 mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setLogoutConfirmModal(false)}
                  className="text-sm text-gray-400 hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="text-sm text-gray-400 hover:text-primary"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
