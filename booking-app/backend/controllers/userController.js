const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user (Register)
exports.createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;
    


    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password // Password will be hashed by the pre-save hook
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create an admin user
exports.createAdmin = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newAdmin = new User({
      username,
      firstName,
      lastName,
      email,
      password, // Password will be hashed by the pre-save hook
      isAdmin: true // Set the isAdmin flag to true
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", adminId: newAdmin._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Include isAdmin and other user details in the response
    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search user by name (Admin Only)
exports.searchUserByName = async (req, res) => {
  try {
    // Assuming req.query.name contains the search term
    const users = await User.find({ 
      $or: [
        { firstName: { $regex: req.query.name, $options: 'i' }},
        { lastName: { $regex: req.query.name, $options: 'i' }}
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT
    const updates = req.body;

    // Perform validation on updates if necessary

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.keys(updates).forEach((update) => {
      if (update !== 'isAdmin') { // Prevent updating 'isAdmin' field
        user[update] = updates[update];
      }
    });

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user information (Admin Only)
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user password
exports.updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // Assuming userID is extracted from JWT

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // Password will be hashed by pre-save hook
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};