const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register User
exports.registerUser = async (req, res) => {
  const {
    fullName,
    gender,
    dateOfBirth,
    email,
    employeeID,
    position,
    password,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      fullName,
      gender,
      dateOfBirth,
      email,
      employeeID,
      position,
      password,
    });
    res
      .status(201)
      .json({
        message: "User registered successfully",
        token: generateToken(user._id),
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { employeeID, password } = req.body;
  try {
    const user = await User.findOne({ employeeID });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
