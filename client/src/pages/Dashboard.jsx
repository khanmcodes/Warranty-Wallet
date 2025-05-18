import { useEffect, useState } from "react";
import API from "../../axios";
import WarrantyForm from "../components/WarrantyForm";
import WarrantyList from "../components/WarrantyList";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [filteredWarranties, setFilteredWarranties] = useState([]);
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filters, setFilters] = useState({
    search: "",
    status: "all"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem('token');
        window.location.href = "/login";
      }
    };

    const fetchWarranties = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/warranties", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
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
        w => 
          w.productName.toLowerCase().includes(searchTerm) || 
          w.brand.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.status !== "all") {
      if (filters.status === "valid") {
        result = result.filter(w => {
          const expiry = getExpiryDate(w);
          return expiry > now;
        });
      } else if (filters.status === "expired") {
        result = result.filter(w => {
          const expiry = getExpiryDate(w);
          return expiry < now;
        });
      } else if (filters.status === "expiring") {
        result = result.filter(w => {
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
    setFilters({ ...filters, status: "all" });
    setActiveFilter("all");
    setShowAddForm(false);
  };

  return (
    <div className="flex min-h-screen bg-darkBg-900 text-darkText">
      <Sidebar 
        onAddWarrantyClick={handleAddWarrantyClick}
        onShowExpiredClick={handleShowExpiredClick}
        onShowExpiringClick={handleShowExpiringClick}
        onShowAllClick={handleShowAllClick}
        activeFilter={activeFilter}
        currentFilter={filters.status}
      />
      
      <div className="flex-1 p-4 md:p-6 mx-0 xl:mx-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Welcome{user ? `, ${user.name}` : ""}! 👋
              </h1>
            </div>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Manage your product warranties in one place
            </p>
          </div>
        </header>
        
        <main>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary shadow-glow-primary"></div>
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
                  <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-0">
                    {activeFilter === 'expired' 
                      ? 'Expired Warranties' 
                      : activeFilter === 'add' 
                        ? 'Add Warranty' 
                        : filters.status === 'expiring'
                          ? 'Expiring Soon'
                          : 'Your Warranties'}
                    {filteredWarranties.length > 0 && 
                      <span className="ml-2 text-gray-400 text-base font-normal">
                        ({filteredWarranties.length})
                      </span>
                    }
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                      className="flex items-center gap-1 bg-darkBg-800 border border-borderColor text-darkText px-3 py-2 rounded-lg hover:bg-darkBg-700 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filters
                    </button>
                    
                    <button
                      onClick={handleAddWarrantyClick}
                      className="flex items-center gap-1 bg-gradient-primary text-[#1e293b] px-3 py-2 rounded-lg hover:shadow-glow-primary transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden md:inline">Add Warranty</span>
                    </button>
                  </div>
                </div>
                
                {isFilterExpanded && (
                  <div className="bg-darkBg-800 bg-opacity-70 backdrop-blur-sm p-4 rounded-lg shadow-dark border border-borderColor mb-4">
                    <h3 className="text-md font-semibold mb-3 text-darkText">Filter Warranties</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="search" className="block text-sm text-gray-400 mb-1">Search</label>
                        <div className="relative">
                          <input
                            id="search"
                            type="text"
                            placeholder="Search product or brand..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange({ search: e.target.value })}
                            className="w-full px-3 py-2 pl-9 bg-darkBg-700 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                      
                      <div>
                        <label htmlFor="status" className="block text-sm text-gray-400 mb-1">Status</label>
                        <select 
                          id="status"
                          value={filters.status}
                          onChange={(e) => {
                            handleFilterChange({ status: e.target.value });
                            if (e.target.value === "expired") {
                              setActiveFilter("expired");
                            } else if (e.target.value === "expiring") {
                              setActiveFilter("expiring");
                            } else {
                              setActiveFilter("all");
                            }
                          }}
                          className="w-full px-3 py-2 bg-darkBg-700 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="all">All statuses</option>
                          <option value="valid">Valid</option>
                          <option value="expired">Expired</option>
                          <option value="expiring">Expiring soon</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          setFilters({ search: "", status: "all" });
                          setActiveFilter("all");
                        }}
                        className="text-sm text-gray-400 hover:text-primary"
                      >
                        Reset filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <WarrantyList warranties={filteredWarranties} onDelete={handleDelete} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
