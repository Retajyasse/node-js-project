

const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {

    if(error.code === 11000){
      return res.status(400).json({message:"Email already exists"});
    }

    res.status(500).json({message:error.message});
  }
};

const updateUser = async (req,res)=>{
  try{

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    res.json(user);

  }catch(error){
    res.status(500).json({message:error.message});
  }
}

const deleteUser = async (req,res)=>{
  try{

    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    res.json({message:"User deleted"});

  }catch(error){
    res.status(500).json({message:error.message});
  }
}

module.exports = { getUsers, createUser, updateUser, deleteUser };