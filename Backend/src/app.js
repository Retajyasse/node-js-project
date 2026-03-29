const express = require('express');
const app = express();

// Middlewares
const logger = require('./middlewares/logger');
const checkApiKey = require('./middlewares/checkApiKey');
const errorHandler = require('./middlewares/errorHandler');

const cors = require("cors");
const helmet = require("helmet");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);


// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");

app.use('/users', userRoutes);
app.use("/projects", require("./routes/projectRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/auth", authRoutes);

// 404 middleware
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handling
app.use(errorHandler);

module.exports = app;