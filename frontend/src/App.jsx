import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Projects from './pages/projects'
import Users from './pages/users'
import Tasks from './pages/tasks'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/users" element={<Users />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App