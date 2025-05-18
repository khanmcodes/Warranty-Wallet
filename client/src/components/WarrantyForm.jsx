import { useState } from "react";
import API from "../../axios";

export default function WarrantyForm({ onAdd }) {
  const [form, setForm] = useState({
    productName: "",
    brand: "",
    purchaseDate: "",
    durationMonths: "",
    receiptUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/warranties", form);
    onAdd(res.data); // notify parent to update list
    setForm({ productName: "", brand: "", purchaseDate: "", durationMonths: "", receiptUrl: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded max-w-md">
      <input name="productName" value={form.productName} onChange={handleChange} placeholder="Product Name" required />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
      <input name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} required />
      <input name="durationMonths" type="number" value={form.durationMonths} onChange={handleChange} placeholder="Duration (months)" required />
      <input name="receiptUrl" value={form.receiptUrl} onChange={handleChange} placeholder="Receipt Image URL (optional)" />
      <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Add Warranty</button>
    </form>
  );
}
