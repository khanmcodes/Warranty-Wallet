import { useState } from "react";
import API from "../../axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", { email, password });
      setIsLoggedIn(true);
      localStorage.setItem('token', response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input mb-4" />
      <button onClick={handleLogin} className="btn">Login</button>
      <p>Don't have an account? <button onClick={handleSignup} className="text-blue-500">Sign up</button></p>
    </div>
  );
}
