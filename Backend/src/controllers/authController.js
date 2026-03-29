const asyncWrapper = require("../utils/asyncWrapper");
const authService = require("../services/authService");

const register = asyncWrapper(async (req, res) => {
  const userData = await authService.register(req.body);
  res.status(201).json({ status: "success", data: userData });
});

const login = asyncWrapper(async (req, res) => {
  const token = await authService.login(req.body);
  res.json({ status: "success", token });
});

const profile = asyncWrapper(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  res.json({ status: "success", data: user });
});

module.exports = { register, login, profile };