const User = require("../models/AddUserSchema");

exports.createUser = async(req,res) =>{
    const{name,email,position,role,complete,status,date} = req.body;
    if(!name || !email || !position || !role || !complete || !status || !date){
        return res.status(400).json({error: "All fields are required."});
    }
    try{
        const newUser = new User({
            name,email,position,role,complete,status,date
        });
        await newUser.save();
        res.status(201).json({message:"Saved Successfully"});
    } catch(err){
        console.error("Error Occured While saving user",err);
        res.status(500).json({error: "Failed to save user"});
    }

};


exports.getUser = async(req,res) =>{
    try{
        const users = await User.find().sort({createdAt: -1});
        res.status(200).json(users);
    } catch(err){
        console.error("Error fetching user",err);
        res.status(500).json({error : "Failed to save."});
    }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user." });
  }
};