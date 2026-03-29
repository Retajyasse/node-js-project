const userService = require("../services/userService");
const asyncWrapper = require("../utils/asyncWrapper");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getUsers();
  res.json({ status: "success", data: users });
});

const getUserById = asyncWrapper(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ status: "success", data: user });
});

const createUser = asyncWrapper(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ status: "success", data: user });
});

const updateUser = asyncWrapper(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json({ status: "success", data: user });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.json({ status: "success", data: result });
});

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };