import { signup, login, getUser } from "./services/authService";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const handleSignup = async () => {
    try {
      const res = await signup("Ali Khan", "ali@example.com", "123456");
      console.log("Signup success:", res.data);
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login("ali@example.com", "123456");
      console.log("Login success:", res.data);
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message);
    }
  };

  const handleGetUser = async () => {
    try {
      const res = await getUser();
      setUser(res.data.user);
      console.log("Current user:", res.data.user);
    } catch (err) {
      console.error("Get user failed:", err.response?.data?.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Warranty Wallet Auth Test</h1>
      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Signup</button>
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Login</button>
      <button onClick={handleGetUser} className="bg-gray-700 text-white px-4 py-2 rounded">Get User</button>

      {user && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
