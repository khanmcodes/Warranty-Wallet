import API from "../axios";

export default function WarrantyList({ warranties, onDelete }) {
  
    const handleDelete = async (id) => {
    await API.delete(`/warranties/${id}`);
    onDelete(id);
  };

  return (
    <div className="grid gap-4 p-4">
      {warranties.map((w) => {
        const purchaseDate = new Date(w.purchaseDate).toLocaleDateString();
        const expiryDate = new Date(new Date(w.purchaseDate).setMonth(new Date(w.purchaseDate).getMonth() + w.durationMonths)).toLocaleDateString();

        return (
          <div key={w._id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-bold">{w.productName}</h2>
            <p>Brand: {w.brand}</p>
            <p>Purchased: {purchaseDate}</p>
            <p>Expires: {expiryDate}</p>
            {w.receiptUrl && <img src={w.receiptUrl} alt="Receipt" className="w-32 mt-2" />}
            <button onClick={() => handleDelete(w._id)} className="text-red-600 mt-2">Delete</button>
          </div>
        );
      })}
    </div>
  );
}
