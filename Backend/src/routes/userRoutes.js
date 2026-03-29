const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const protect = require("../middlewares/authMiddleware");
const checkApiKey = require("../middlewares/checkApiKey");

router.get('/', checkApiKey, getUsers);
router.post('/', protect , createUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;