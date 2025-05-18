import { useState } from "react";
import API from "../../axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      alert("Signup failed ❌" + err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input mb-2" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input mb-4" />
      <button onClick={handleSignup} className="btn">Signup</button>
    </div>
  );
}
