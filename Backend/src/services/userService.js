const User = require("../models/User");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const getUsers = async () => {
  return await User.find().select("-password"); 
};


const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new AppError("User not found", 404);
  return user;
};


const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};


const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
  if (!user) throw new AppError("User not found", 404);

  return user;
};


const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError("User not found", 404);

  return { message: "User deleted" };
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };