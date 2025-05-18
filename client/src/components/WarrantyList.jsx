import API from "../../axios";
import { useState, useRef, useEffect } from "react";

export default function WarrantyList({ warranties, onDelete }) {
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedWarranty(null);
      }
    }

    if (selectedWarranty) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedWarranty]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this warranty?")) {
      await API.delete(`/warranties/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onDelete(id);
      if (selectedWarranty && selectedWarranty._id === id) {
        setSelectedWarranty(null);
      }
    }
  };

  // Calculate days remaining until expiry
  const getDaysRemaining = (purchaseDate, durationMonths) => {
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
    
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate percentage of warranty used
  const getWarrantyProgressPercent = (purchaseDate, durationMonths) => {
    const startDate = new Date(purchaseDate);
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
    
    const now = new Date();
    
    // Total duration in milliseconds
    const totalDuration = expiryDate - startDate;
    // Time elapsed in milliseconds
    const timeElapsed = now - startDate;
    
    // Calculate percentage used (0-100)
    const percentUsed = Math.min(100, Math.max(0, (timeElapsed / totalDuration) * 100));
    
    return percentUsed;
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format days remaining/overdue for better readability
  const formatDaysRemaining = (days) => {
    if (days === 0) return "Expires today";
    if (days === 1) return "Expires tomorrow";
    if (days > 0) return `${days} days remaining`;
    if (days === -1) return "Expired yesterday";
    return `Expired ${Math.abs(days)} days ago`;
  };

  if (warranties.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="bg-darkBg-800 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 max-w-lg mx-auto border border-borderColor shadow-dark">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-darkText mb-2">No warranties found</h3>
          <p className="text-gray-400">Add your first warranty to keep track of your purchases!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {warranties.map((warranty) => {
          const daysRemaining = getDaysRemaining(warranty.purchaseDate, warranty.durationMonths);
          const isExpired = daysRemaining < 0;
          const isExpiringSoon = !isExpired && daysRemaining <= 30;
          const percentUsed = getWarrantyProgressPercent(warranty.purchaseDate, warranty.durationMonths);
          
          // Define status gradient
          const statusGradient = isExpired 
            ? 'bg-gradient-error' 
            : isExpiringSoon 
              ? 'bg-gradient-warning' 
              : 'bg-gradient-accent';
          
          return (
            <div 
              key={warranty._id}
              onClick={() => setSelectedWarranty(warranty)}
              className={`
                relative overflow-hidden rounded-lg cursor-pointer
                transform transition-all duration-200 hover:scale-[1.02] hover:shadow-dark-lg
                ${isExpired ? "opacity-80" : ""}
                bg-gradient-card border border-borderColor
                shadow-dark
              `}
            >
              {/* Status indicator stripe */}
              <div className={`absolute top-0 left-0 w-full h-1 ${statusGradient}`}></div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-darkText truncate pr-2">{warranty.productName}</h2>
                  <div className="flex gap-2">
                    {isExpired ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-900/30 text-red-300 border border-red-700/30">
                        Expired
                      </span>
                    ) : isExpiringSoon ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-700/30">
                        Expiring soon
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-900/30 text-green-300 border border-green-700/30">
                        Active
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 font-medium mb-3">{warranty.brand}</p>
                
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Purchased:</span>
                    <span className="font-medium text-darkText">{formatDate(warranty.purchaseDate)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Expires:</span>
                    <span className={`font-medium ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-darkText'}`}>
                      {formatDate(new Date(new Date(warranty.purchaseDate).setMonth(
                        new Date(warranty.purchaseDate).getMonth() + warranty.durationMonths
                      )))}
                    </span>
                  </div>
                  
                  <div className="mt-4 bg-darkBg-900/50 p-3 rounded-lg border border-borderColor">
                    <div className="w-full bg-darkBg-900 rounded-full h-2.5 overflow-hidden shadow-inner-dark mb-1">
                      <div 
                        className={`h-2.5 rounded-full ${statusGradient}`}
                        style={{ width: `${isExpired ? '100' : percentUsed}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>{Math.round(percentUsed)}% used</span>
                      <span className={`font-medium ${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {formatDaysRemaining(daysRemaining)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedWarranty && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-darkBg-800 rounded-lg shadow-dark-lg w-full max-w-md max-h-[90vh] overflow-y-auto border border-borderColor"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-darkText">{selectedWarranty.productName}</h2>
                <button 
                  onClick={() => setSelectedWarranty(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                {selectedWarranty.brand && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Brand</p>
                    <p className="text-lg font-semibold text-darkText">{selectedWarranty.brand}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Purchase Date</p>
                    <p className="text-lg font-semibold text-darkText">
                      {formatDate(selectedWarranty.purchaseDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Expiry Date</p>
                    <p className={`text-lg font-semibold ${
                      getDaysRemaining(selectedWarranty.purchaseDate, selectedWarranty.durationMonths) < 0 
                        ? 'text-red-400' 
                        : getDaysRemaining(selectedWarranty.purchaseDate, selectedWarranty.durationMonths) <= 30
                          ? 'text-yellow-400'
                          : 'text-darkText'
                    }`}>
                      {formatDate(new Date(new Date(selectedWarranty.purchaseDate).setMonth(
                        new Date(selectedWarranty.purchaseDate).getMonth() + selectedWarranty.durationMonths
                      )))}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400">Warranty Duration</p>
                  <p className="text-lg font-semibold text-darkText">
                    {selectedWarranty.durationMonths} months
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400">Status</p>
                  <div className="mt-1">
                    {(() => {
                      const daysRemaining = getDaysRemaining(
                        selectedWarranty.purchaseDate, 
                        selectedWarranty.durationMonths
                      );
                      const isExpired = daysRemaining < 0;
                      const isExpiringSoon = !isExpired && daysRemaining <= 30;
                      
                      return isExpired ? (
                        <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md bg-red-900/30 text-red-300 border border-red-700/30">
                          {formatDaysRemaining(daysRemaining)}
                        </span>
                      ) : isExpiringSoon ? (
                        <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md bg-yellow-900/30 text-yellow-300 border border-yellow-700/30">
                          {formatDaysRemaining(daysRemaining)}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md bg-green-900/30 text-green-300 border border-green-700/30">
                          {formatDaysRemaining(daysRemaining)}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="mb-6 bg-darkBg-900/50 p-4 rounded-lg border border-borderColor">
                  <p className="text-sm text-gray-400 mb-2">Warranty Progress</p>
                  <div className="w-full bg-darkBg-900 rounded-full h-2.5 overflow-hidden shadow-inner-dark">
                    <div 
                      className={`h-2.5 rounded-full ${
                        getDaysRemaining(selectedWarranty.purchaseDate, selectedWarranty.durationMonths) < 0 
                          ? 'bg-gradient-error' 
                          : getDaysRemaining(selectedWarranty.purchaseDate, selectedWarranty.durationMonths) <= 30 
                            ? 'bg-gradient-warning' 
                            : 'bg-gradient-accent'
                      }`}
                      style={{ 
                        width: `${getWarrantyProgressPercent(
                          selectedWarranty.purchaseDate, 
                          selectedWarranty.durationMonths
                        )}%` 
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-400">
                      {Math.round(getWarrantyProgressPercent(
                        selectedWarranty.purchaseDate, 
                        selectedWarranty.durationMonths
                      ))}% used
                    </span>
                    <span className={`
                      ${getDaysRemaining(selectedWarranty.purchaseDate, selectedWarranty.durationMonths) < 0 
                        ? 'text-red-400' 
                        : getDaysRemaining(selectedWarranty.purchaseDate, selectedWarranty.durationMonths) <= 30
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    `}>
                      {formatDaysRemaining(getDaysRemaining(
                        selectedWarranty.purchaseDate, 
                        selectedWarranty.durationMonths
                      ))}
                    </span>
                  </div>
                </div>

                {selectedWarranty.receiptUrl && (
                  <div className="mb-6 bg-darkBg-900/50 p-4 rounded-lg border border-borderColor">
                    <p className="text-sm text-gray-400 mb-2">Receipt</p>
                    <img 
                      src={selectedWarranty.receiptUrl} 
                      alt="Receipt" 
                      className="w-full rounded-md border border-borderColor" 
                    />
                  </div>
                )}

                <div className="flex justify-end mt-6 pt-4 border-t border-borderColor">
                  <button
                    onClick={(e) => handleDelete(selectedWarranty._id, e)}
                    className="flex items-center justify-center bg-red-900/20 hover:bg-red-900/40 text-red-400 py-2 px-4 rounded-lg transition-colors border border-red-900/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete Warranty
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
