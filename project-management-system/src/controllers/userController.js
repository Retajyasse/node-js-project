let users = [];
let nextId = 1;

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const createUser = (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ message: "Name and role required" });

  const newUser = { id: nextId++, name, role };
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ message: "Name and role required" });

  users[index] = { id: userId, name, role };
  res.status(200).json(users[index]);
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(index, 1)[0];
  res.status(200).json(deletedUser);
};

module.exports = { getUsers, createUser, updateUser, deleteUser };