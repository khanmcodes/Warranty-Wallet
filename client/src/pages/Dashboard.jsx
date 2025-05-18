import { useEffect, useState } from "react";
import API from "../axios";
import WarrantyForm from "../components/WarrantyForm";
import WarrantyList from "../components/WarrantyList";

export default function Dashboard() {
  const [warranties, setWarranties] = useState([]);

  useEffect(() => {
    const fetchWarranties = async () => {
      const res = await API.get("/warranties");
      setWarranties(res.data);
    };
    fetchWarranties();
  }, []);

  const handleAdd = (newWarranty) => {
    setWarranties([newWarranty, ...warranties]);
  };

  const handleDelete = (id) => {
    setWarranties(warranties.filter((w) => w._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 font-semibold">Warranty Wallet</h1>
      <WarrantyForm onAdd={handleAdd} />
      <WarrantyList warranties={warranties} onDelete={handleDelete} />
    </div>
  );
}
