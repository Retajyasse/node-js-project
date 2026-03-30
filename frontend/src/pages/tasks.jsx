import React, { useState, useEffect } from 'react';
import { taskAPI, projectAPI, userAPI } from '../api';
import { NavLink } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    project: '',
    assignedTo: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [resTasks, resProjects, resUsers] = await Promise.all([
        taskAPI.getAll(),
        projectAPI.getAll(),
        userAPI.getAll()
      ]);
      setTasks(resTasks.data.data);
      setProjects(resProjects.data.data);
      setUsers(resUsers.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (formData.id) {
      await taskAPI.update(formData.id, formData);
    } else {
      await taskAPI.create(formData);
    }
    setShowModal(false);
    setFormData({ title: '', description: '', status: 'Todo', project: '', assignedTo: '' });
    loadData();
  } catch (err) {
    alert(err.response?.data?.message || "Operation failed");
  }
};

const deleteTask = async (id) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    try {
      await taskAPI.delete(id);
      loadData(); 
    } catch (err) {
      alert("Delete failed");
    }
  }
};

const openEditModal = (task) => {
  setFormData({
    id: task._id,  
    title: task.title,
    description: task.description,
    status: task.status,
    project: task.project?._id || '',
    assignedTo: task.assignedTo?._id || ''
  });
  setShowModal(true);
};

  const updateStatus = async (id, newStatus) => {
    try {
      await taskAPI.update(id, { status: newStatus });
      loadData();  
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || "Error"));
    }
  };

  const columns = ['Todo', 'In Progress', 'Done'];

  if (loading) return (
    <div className="min-h-screen bg-[#0d0f14] text-white flex items-center justify-center font-bold">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7c5dfa]"></div>
    </div>
  );

  

  return (
    <div className="flex min-h-screen bg-[#0d0f14] text-white font-sans">
      
    
      <div className="w-64 bg-[#0d0f14] border-r border-gray-800 p-6 hidden md:block">
        <div className="text-[#7c5dfa] text-2xl font-bold mb-10 flex items-center gap-2">
          <i className="fas fa-bolt"></i> TaskFlow
        </div>
        <nav className="space-y-4 text-gray-400">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700 shadow-lg' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-th-large w-5 text-[#7c5dfa]"></i> Dashboard
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700 shadow-lg' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-briefcase w-5 text-[#7c5dfa]"></i> Projects
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700 shadow-lg' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-check-double w-5 text-[#7c5dfa]"></i> Tasks
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700 shadow-lg' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-users w-5 text-[#7c5dfa]"></i> Users
          </NavLink>
        </nav>
      </div>

    
      <div className="flex-1 p-8 bg-[#090b0e] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-gray-500 text-sm">{tasks.length} total tasks tracked</p>
          </div>
        
          <button 
            onClick={() => {
              setFormData({ title: '', description: '', status: 'Todo', project: '', assignedTo: '' });
              setShowModal(true);
            }} 
            className="bg-[#7c5dfa] hover:bg-[#6d4aff] px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#7c5dfa]/20"
          >
            <i className="fas fa-plus text-xs"></i> New Task
          </button>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map(col => (
            <div key={col} className="bg-[#161b22]/30 rounded-2xl p-4 border border-gray-800/50 min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="font-bold flex items-center gap-2 tracking-wide">
                   <span className={`w-2 h-2 rounded-full ${col === 'Todo' ? 'bg-orange-400' : col === 'In Progress' ? 'bg-blue-400' : 'bg-green-400'}`}></span>
                   {col}
                </h2>
                <span className="bg-gray-800 text-gray-400 text-[10px] px-2.5 py-1 rounded-full border border-gray-700">{tasks.filter(t => t.status === col).length}</span>
              </div>

             
              <div className="space-y-4">
                {tasks.filter(t => t.status === col).map(task => (
                  <div key={task._id} className="bg-[#161b22] p-5 rounded-xl border border-gray-800 hover:border-gray-600 transition-all hover:shadow-xl group relative">
                    
                   
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-100 group-hover:text-[#7c5dfa] transition-colors pr-10">{task.title}</h3>
                      <div className="flex gap-3 absolute top-5 right-5">
                        <button onClick={() => openEditModal(task)} className="text-gray-500 hover:text-blue-400 transition-colors">
                          <i className="fas fa-edit text-xs"></i>
                        </button>
                        <button onClick={() => deleteTask(task._id)} className="text-gray-500 hover:text-red-400 transition-colors">
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mb-5 leading-relaxed line-clamp-2">{task.description}</p>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-3">
                        <span className="text-[9px] bg-gray-800/50 text-gray-400 px-2 py-1 rounded border border-gray-700 w-fit font-semibold tracking-tighter uppercase">
                          {task.project?.name || 'Unassigned'}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-gradient-to-br from-[#7c5dfa] to-[#9171f8] rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                            {task.assignedTo?.name?.[0] || '?'}
                            </div>
                            <span className="text-[10px] text-gray-400">{task.assignedTo?.name || 'Unknown'}</span>
                        </div>
                      </div>
                      
                     
                      <div className="relative">
                        <select 
                          value={task.status} 
                          onChange={(e) => updateStatus(task._id, e.target.value)}
                          className={`appearance-none text-[10px] font-bold pl-3 pr-8 py-2 rounded-lg border cursor-pointer transition-all outline-none bg-[#161b22] ${
                            task.status === 'Done' ? 'text-green-500 border-green-500/20' : 
                            task.status === 'In Progress' ? 'text-blue-500 border-blue-500/20' : 
                            'text-orange-400 border-orange-500/20'
                          }`}
                        >
                          <option value="Todo">Todo</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[8px] pointer-events-none text-gray-500"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

   
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] w-full max-w-md p-8 rounded-3xl border border-gray-700 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-100">{formData.id ? 'Edit Task' : 'New Task'}</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Task Title</label>
                <input type="text" placeholder="What needs to be done?" className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3.5 outline-none focus:border-[#7c5dfa] transition-all" 
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Description</label>
                <textarea placeholder="Add some details..." className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3.5 h-24 outline-none focus:border-[#7c5dfa] resize-none transition-all" 
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Status</label>
                  <select className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3.5 outline-none focus:border-[#7c5dfa]" 
                    value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    {columns.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Project</label>
                  <select className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3.5 outline-none focus:border-[#7c5dfa]" 
                    value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} required>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5 ml-1">Assignee</label>
                <select className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3.5 outline-none focus:border-[#7c5dfa]" 
                  value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: e.target.value})} required>
                  <option value="">Select User</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 py-4 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-[#7c5dfa] hover:bg-[#6d4aff] py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#7c5dfa]/20">
                    {formData.id ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;