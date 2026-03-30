import React, { useState, useEffect } from 'react';
import { projectAPI, taskAPI } from '../api';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [resProjects, resTasks] = await Promise.all([
        projectAPI.getAll(),
        taskAPI.getAll()
      ]);

      const projects = resProjects.data.data;
      const tasks = resTasks.data.data;

      setStats({
        projects: projects.length,
        totalTasks: tasks.length,
        todo: tasks.filter(t => t.status === 'Todo').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Done' || t.status === 'Completed').length
      });
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStats(); }, []);

  
  const calculateWidth = (count) => {
    if (stats.totalTasks === 0) return "0%";
    return `${(count / stats.totalTasks) * 100}%`;
  };

  return (
    <div className="flex min-h-screen bg-[#0d0f14] text-white">
      {}
      <div className="w-64 bg-[#0d0f14] border-r border-gray-800 p-6 hidden md:block">
        <div className="text-[#7c5dfa] text-2xl font-bold mb-10 flex items-center gap-2">
          <i className="fas fa-bolt"></i> TaskFlow
        </div>
        <nav className="space-y-4 text-gray-400">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-th-large w-5 text-[#7c5dfa]"></i> Dashboard
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-briefcase w-5 text-[#7c5dfa]"></i> Projects
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-check-double w-5 text-[#7c5dfa]"></i> Tasks
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? 'text-white bg-[#161b22] border-gray-700' : 'border-transparent hover:text-white'}`}>
            <i className="fas fa-users w-5 text-[#7c5dfa]"></i> Users
          </NavLink>
        </nav>
      </div>

      {}
      <div className="flex-1 p-8 bg-[#090b0e]">
        <header className="mb-10">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of your workspace</p>
        </header>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Projects Card */}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-xs mb-1">Projects</p>
              <h3 className="text-2xl font-bold">{stats.projects}</h3>
            </div>
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
              <i className="fas fa-folder"></i>
            </div>
          </div>

          {/* Total Tasks Card */}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-xs mb-1">Total Tasks</p>
              <h3 className="text-2xl font-bold">{stats.totalTasks}</h3>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
              <i className="fas fa-tasks"></i>
            </div>
          </div>

          {/* Todo Card */}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-xs mb-1">Todo</p>
              <h3 className="text-2xl font-bold">{stats.todo}</h3>
            </div>
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
              <i className="fas fa-exclamation-circle"></i>
            </div>
          </div>

          {/* In Progress Card */}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-xs mb-1">In Progress</p>
              <h3 className="text-2xl font-bold">{stats.inProgress}</h3>
            </div>
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
              <i className="fas fa-clock"></i>
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-xs mb-1">Completed</p>
              <h3 className="text-2xl font-bold">{stats.completed}</h3>
            </div>
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
        </div>

        {/* Task Distribution Bar */}
        <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800">
          <h4 className="text-sm font-bold mb-6">Task Distribution</h4>
          
          <div className="h-3 w-full bg-gray-800 rounded-full flex overflow-hidden mb-6">
            <div style={{ width: calculateWidth(stats.todo) }} className="bg-orange-500 h-full transition-all duration-500"></div>
            <div style={{ width: calculateWidth(stats.inProgress) }} className="bg-[#7c5dfa] h-full transition-all duration-500"></div>
            <div style={{ width: calculateWidth(stats.completed) }} className="bg-green-500 h-full transition-all duration-500"></div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-xs text-gray-400">Todo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#7c5dfa]"></span>
              <span className="text-xs text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-xs text-gray-400">Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;