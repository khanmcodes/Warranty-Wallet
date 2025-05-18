import { useEffect, useState } from "react";
import API from "../../axios";
import WarrantyForm from "../components/WarrantyForm";
import WarrantyList from "../components/WarrantyList";

export default function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));

    const fetchWarranties = async () => {
      const token = localStorage.getItem('token');
      const res = await API.get("/warranties", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
      <h1 className="text-3xl font-bold mb-2">Welcome {user?.name || "User"} 👋</h1>
      <h1 className="text-3xl mb-4 font-semibold">Warranty Wallet</h1>
      <WarrantyForm onAdd={handleAdd} />
      <WarrantyList warranties={warranties} onDelete={handleDelete} />
      <button
        onClick={() => {
          API.post("/auth/logout")
            .then(() => {
              window.location.href = "/login";
            })
            .catch(err => {
              console.error("Logout failed:", err);
            });
        }}
        className="absolute top-4 right-4 text-red-500 font-bold"
      >
        Logout
      </button>
    </div>
  );
}
