import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { projectAPI, userAPI } from '../api'; 

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    status: 'Not Started',
    assignedTo: ''
  });

  
  const loadData = async () => {
    try {
      setLoading(true);
      const [resProjects, resUsers] = await Promise.all([
        projectAPI.getAll(),
        userAPI.getAll()
      ]);
      setProjects(resProjects.data.data);
      setUsers(resUsers.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load data");
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
      const projectPayload = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        assignedTo: formData.assignedTo
      };

      if (isEditing) {
        await projectAPI.update(formData.id, projectPayload);
      } else {
        await projectAPI.create(projectPayload);
      }

      setShowModal(false);
      loadData(); 
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectAPI.delete(id);
        loadData();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  
  const openEditModal = (p) => {
    setFormData({
      id: p._id,
      name: p.name,
      description: p.description,
      status: p.status,
      assignedTo: p.assignedTo?._id || ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  if (loading) return <div className="min-h-screen bg-[#0d0f14] text-white flex items-center justify-center font-bold">Loading Projects...</div>;

  return (
    <div className="flex min-h-screen bg-[#0d0f14] text-white font-sans">
      
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#090b0e] overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-gray-500 mt-1">{projects.length} active projects</p>
          </div>
          <button 
            onClick={() => { setIsEditing(false); setFormData({name:'', description:'', status:'Not Started', assignedTo:''}); setShowModal(true); }}
            className="bg-[#7c5dfa] hover:bg-[#6d4aff] px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20"
          >
            <i className="fas fa-plus text-sm"></i> New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p._id} className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 hover:border-[#7c5dfa]/50 transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg group-hover:text-[#7c5dfa] transition-colors">{p.name}</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${
                  p.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                  p.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  {p.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 h-12 overflow-hidden">{p.description}</p>
              
              <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-7 h-7 bg-gradient-to-tr from-[#7c5dfa] to-[#927afc] rounded-full flex items-center justify-center text-[10px] text-white font-bold uppercase shadow-inner">
                    {p.assignedTo?.name?.[0] || '?'}
                  </div>
                  <span className="truncate max-w-[80px]">{p.assignedTo?.name || 'Guest'}</span>
                </div>
                <div className="flex gap-4 text-gray-500 text-sm">
                  <button onClick={() => openEditModal(p)} className="hover:text-blue-400 transition-colors"><i className="fas fa-edit"></i></button>
                  <button onClick={() => handleDelete(p._id)} className="hover:text-red-400 transition-colors"><i className="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*New/Edit Project */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] w-full max-w-md p-8 rounded-3xl border border-gray-700 shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isEditing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-gray-400 text-sm block mb-2 font-medium">Project Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 outline-none focus:border-[#7c5dfa] transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2 font-medium">Description</label>
                <textarea 
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 h-24 outline-none focus:border-[#7c5dfa] resize-none transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2 font-medium">Status</label>
                  <select 
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 outline-none focus:border-[#7c5dfa] cursor-pointer"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-2 font-medium">Assigned To</label>
                  <select 
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 outline-none focus:border-[#7c5dfa] cursor-pointer"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map(u => (
                      <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-[#7c5dfa] hover:bg-[#6d4aff] py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all">
                  {isEditing ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;