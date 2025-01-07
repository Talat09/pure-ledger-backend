import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
// Register User
export const registerUser = async (req, res) => {
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
  
      // Generate token
      const token = generateToken(user._id);
  
      res.status(201).json({
        message: "User registered successfully",
        fullName: user.fullName,
        token, // Return token in response body
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Login User
  export const loginUser = async (req, res) => {
    const { employeeID, password } = req.body;
    try {
      const user = await User.findOne({ employeeID });
      if (user && (await user.matchPassword(password))) {
        // Generate token
        const token = generateToken(user._id);
  
        res.status(200).json({
          fullName: user.fullName,
          token, // Return token in response body
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
