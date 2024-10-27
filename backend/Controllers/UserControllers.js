const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {

    let Users;

    // Get all users
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    // Not found
    if(!users) {
        return res.stratus(404).json({message:"User not found"});
    }

    // Display all users
    return res.status(200).json({ users });
};

// Data insert
const addUsers = async (req, res, next) => {

    const {name, gmail, age, address} = req.body;

    let users;

    try {
        users = new User({name, gmail, age, address});	
        await users.save();
    } catch (err) {
        console.log(err);	
    }
    // Not insert users
    if (!users) {
        return res.status(400).json({message:"unable to add users"});	
    }
    return res.status(200).json({ users });
};

// Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
    }
    // not available users
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({ user });
};

// Update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name, gmail, age, address} = req.body;

    let users;

    try {
        users = await User.findByIdAndUpdate(id, {name: name, gmail: gmail, age: age, address: address});
        users = await users.save();
    } catch (err) {
        console.log(err);
    }
    // not available users
    if (!users) {
        return res.status(404).json({message: "Unable to update user details"});
    }
    return res.status(200).json({ users });
};

// Delete user 
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    
    let user;

    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
    }
    // not available users
    if (!user) {
        return res.status(404).json({message: "Unable to delete user"});
    }
    return res.status(200).json({ user });
}

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;