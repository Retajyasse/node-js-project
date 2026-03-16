const express = require('express');
const app = express();

// Middlewares
const logger = require('./middlewares/logger');
const checkApiKey = require('./middlewares/checkApiKey');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(logger);
// app.use(checkApiKey);



// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
app.use("/projects", require("./routes/projectRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

// 404 middleware
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handling
app.use(errorHandler);

module.exports = app;