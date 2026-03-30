import axios from 'axios';

const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'iti-node-project' 
    }
});


API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



export const projectAPI = {
    getAll: () => API_INSTANCE.get('/projects'),
    getById: (id) => API_INSTANCE.get(`/projects/${id}`),
    create: (data) => API_INSTANCE.post('/projects', data),
    update: (id, data) => API_INSTANCE.put(`/projects/${id}`, data),
    delete: (id) => API_INSTANCE.delete(`/projects/${id}`),
};

export const userAPI = {
    getAll: () => API_INSTANCE.get('/users'),
    create: (data) => API_INSTANCE.post('/users', data),
    update: (id, data) => API_INSTANCE.put(`/users/${id}`, data),
    delete: (id) => API_INSTANCE.delete(`/users/${id}`),
};

export const taskAPI = {
    getAll: () => API_INSTANCE.get('/tasks'),
    create: (data) => API_INSTANCE.post('/tasks', data),
    update: (id, data) => API_INSTANCE.put(`/tasks/${id}`, data),
    delete: (id) => API_INSTANCE.delete(`/tasks/${id}`),
};

export const authAPI = {
    login: (data) => API_INSTANCE.post('/auth/login', data),
    register: (data) => API_INSTANCE.post('/auth/register', data),
};