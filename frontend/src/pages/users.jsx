import React, { useState, useEffect } from 'react';
import { userAPI } from '../api'; 
import { NavLink } from 'react-router-dom'; 
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
      
        const updatePayload = {
            name: formData.name,
            email: formData.email,
        };
       
        if(formData.password.trim() !== '') {
            updatePayload.password = formData.password;
        }

        await userAPI.update(formData.id, updatePayload);
      } else {
      
        const createPayload = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }
        await userAPI.create(createPayload);
      }

      setShowModal(false);
      loadData(); 
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will delete the user permanently.")) {
      try {
        await userAPI.delete(id);
        loadData();
      } catch (err) {
        alert("Delete failed. This user might be assigned to projects/tasks.");
      }
    }
  };

  const openEditModal = (u) => {
    setFormData({
      id: u._id,
      name: u.name,
      email: u.email,
      password: '', 
    });
    setIsEditing(true);
    setShowModal(true);
  };

  if (loading) return <div className="min-h-screen bg-[#0d0f14] text-white flex items-center justify-center font-bold">Loading Users...</div>;

  return (
    <div className="flex min-h-screen bg-[#0d0f14] text-white font-sans">
      
    
      <div className="w-64 bg-[#0d0f14] border-r border-gray-800 p-6 hidden md:block">
        <div className="text-[#7c5dfa] text-2xl font-bold mb-10 flex items-center gap-2">
          <i className="fas fa-bolt"></i> TaskFlow
        </div>
        <nav className="space-y-4 text-gray-400">
  <NavLink to="/dashboard" className={({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`
  }>
    <i className="fas fa-th-large w-5 text-[#7c5dfa]"></i> Dashboard
  </NavLink>

  <NavLink to="/projects" className={({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`
  }>
    <i className="fas fa-briefcase w-5 text-[#7c5dfa]"></i> Projects
  </NavLink>

  <NavLink to="/tasks" className={({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`
  }>
    <i className="fas fa-check-double w-5 text-[#7c5dfa]"></i> Tasks
  </NavLink>

  <NavLink to="/users" className={({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`
  }>
    <i className="fas fa-users w-5 text-[#7c5dfa]"></i> Users
  </NavLink>
</nav>
      </div>

    
      <div className="flex-1 p-8 bg-[#090b0e]">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-gray-500 mt-1">{users.length} members</p>
          </div>
          <button 
            onClick={() => { setIsEditing(false); setFormData({name:'', email:'', password:''}); setShowModal(true); }}
            className="bg-[#7c5dfa] hover:bg-[#6d4aff] px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg"
          >
            <i className="fas fa-user-plus text-sm"></i> Add User
          </button>
        </div>

     
        <div className="bg-[#161b22] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-800 text-gray-500 text-xs uppercase font-medium">
              <tr>
                <th className="p-5 text-left">Name</th>
                <th className="p-5 text-left">Email</th>
                <th className="p-5 text-left">Role</th>
                <th className="p-5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-gray-800/20 transition-colors">
                  <td className="p-5 flex items-center gap-4">
                    <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-[11px] text-white font-bold uppercase shadow-inner">
                      {u.name[0]}
                    </div>
                    <span className="font-medium text-gray-100">{u.name}</span>
                  </td>
                  <td className="p-5 text-gray-400 font-mono tracking-tight">{u.email}</td>
                  <td className="p-5">
                  

                    <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-gray-800 text-gray-400">User</span>
                  </td>
                  <td className="p-5 text-gray-500 text-base">
                    <div className="flex gap-4">
                        <button onClick={() => openEditModal(u)} className="hover:text-blue-400 transition-colors"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete(u._id)} className="hover:text-red-400 transition-colors"><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] w-full max-w-md p-8 rounded-3xl border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit User' : 'New User'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-gray-400 text-sm block mb-2 font-medium">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 outline-none focus:border-[#7c5dfa] transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 outline-none focus:border-[#7c5dfa] transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2 font-medium">
                    {isEditing ? 'Password (leave blank to keep)' : 'Password'}
                </label>
                <input 
                  type="password" 
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 outline-none focus:border-[#7c5dfa] transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!isEditing} 
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 py-3 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-[#7c5dfa] hover:bg-[#6d4aff] py-3 rounded-xl font-bold shadow-lg">
                  {isEditing ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;