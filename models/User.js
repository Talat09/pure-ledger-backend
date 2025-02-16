import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    employeeID: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model using ES Modules syntax
export default mongoose.model("User", userSchema);
