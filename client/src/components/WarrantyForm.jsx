import { useState, useRef } from "react";
import API from "../../axios";

export default function WarrantyForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    productName: "",
    brand: "",
    purchaseDate: "",
    durationMonths: 12,
    receiptUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setFormError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    setFormError("");
  };
  
  const uploadImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            resolve(e.target.result);
          }
        }, 100);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    try {
      if (!form.productName.trim()) {
        throw new Error("Product name is required");
      }
      
      let imageUrl = form.receiptUrl;
      
      if (fileInputRef.current?.files?.length > 0) {
        const file = fileInputRef.current.files[0];
        imageUrl = await uploadImage(file);
      }
      
      const warrantyData = {
        ...form,
        receiptUrl: imageUrl
      };
      
      const res = await API.post("/warranties", warrantyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      onAdd(res.data);
      
      setForm({ 
        productName: "", 
        brand: "", 
        purchaseDate: "", 
        durationMonths: 12, 
        receiptUrl: "" 
      });
      setPreviewImage(null);
      setUploadProgress(0);
      
      if (onCancel) onCancel();
    } catch (error) {
      setFormError(error.message || "Failed to add warranty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-darkBg-800 bg-opacity-90 backdrop-blur-sm rounded-lg border border-borderColor shadow-dark p-4 md:p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Add New Warranty</h2>
        {onCancel && (
          <button 
            onClick={onCancel} 
            className="text-gray-400 hover:text-white"
            aria-label="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      {formError && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-900/50 text-red-300 text-sm rounded-md">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-300 mb-1">
            Product Name <span className="text-red-400">*</span>
          </label>
          <input 
            id="productName"
            name="productName" 
            value={form.productName} 
            onChange={handleChange} 
            placeholder="e.g. iPhone 13 Pro" 
            className="w-full px-3 py-2 bg-darkBg-700 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-1">
            Brand
          </label>
          <input 
            id="brand"
            name="brand" 
            value={form.brand} 
            onChange={handleChange} 
            placeholder="e.g. Apple" 
            className="w-full px-3 py-2 bg-darkBg-700 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
          />
        </div>
        
        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-300 mb-1">
            Purchase Date <span className="text-red-400">*</span>
          </label>
          <input 
            id="purchaseDate"
            name="purchaseDate" 
            type="date" 
            value={form.purchaseDate} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-darkBg-700 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="durationMonths" className="block text-sm font-medium text-gray-300 mb-1">
            Warranty Duration ({form.durationMonths} months) <span className="text-red-400">*</span>
          </label>
          <div className="p-4 bg-darkBg-900/50 rounded-lg border border-borderColor">
            <input 
              id="durationMonths"
              name="durationMonths" 
              type="range" 
              min="1" 
              max="60" 
              value={form.durationMonths} 
              onChange={handleChange}
              className="w-full accent-primary" 
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1 month</span>
              <span>60 months (5 years)</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="receiptImage" className="block text-sm font-medium text-gray-300 mb-1">
            Receipt Image
          </label>
          <div className="flex flex-col p-4 bg-darkBg-900/50 rounded-lg border border-borderColor border-dashed">
            <div className="mb-3 flex items-center justify-center">
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Receipt Preview" 
                    className="max-h-40 rounded-lg border border-borderColor" 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute -top-2 -right-2 bg-darkBg-700 rounded-full p-1 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-400">Upload receipt image</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              id="receiptImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-primary/50 text-primary rounded-md hover:bg-primary/10 transition-all text-sm"
              >
                Select Image
              </button>
            </div>
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-primary">
                        Uploading...
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary">
                        {uploadProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-darkBg-700">
                    <div style={{ width: `${uploadProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-primary"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Upload an image of your receipt</p>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-borderColor text-gray-300 rounded-md hover:bg-darkBg-700 transition-all w-full sm:w-auto mt-2 sm:mt-0"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="px-4 py-2 bg-gradient-primary text-[#1e293b] rounded-md hover:shadow-glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Warranty'}
          </button>
        </div>
      </form>
    </div>
  );
}
