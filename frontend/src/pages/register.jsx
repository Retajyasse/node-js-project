import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password
      });

      console.log("User Created:", response.data);
      alert('Account created successfully!');
      
    
      navigate('/login'); 
      
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex flex-col items-center justify-center text-white px-4 font-sans">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-[#7c5dfa] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20">
          <span className="text-2xl font-bold">⚡</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-gray-500 text-sm mt-1">Get started with TaskFlow</p>
      </div>

      
      <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800 w-full max-w-[400px]">
        <form onSubmit={handleRegister} className="space-y-5">
          
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-sm focus:border-[#7c5dfa] outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-sm focus:border-[#7c5dfa] outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-sm focus:border-[#7c5dfa] outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#7c5dfa] hover:bg-[#6d4aff] text-white font-bold py-3 rounded-lg mt-2 transition-all active:scale-95"
          >
            Create Account
          </button>

        </form>
      </div>

     
<p className="mt-8 text-gray-500 text-sm">
  Already have an account?{" "}
  <span 
    onClick={() => navigate('/login')} 
    className="text-[#7c5dfa] hover:underline cursor-pointer font-medium transition-colors"
  >
    Sign in
  </span>
</p>

    </div>
  );
};

export default Register;