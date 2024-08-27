import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://94.74.86.174:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, username}),
      });
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      console.log('Login successful', data.data.token);
      localStorage.setItem('token', data.data.token);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?
        <a href="/register" className="text-blue-500 underline">
          Register here
        </a>
      </p>
    </div>
  );
}
