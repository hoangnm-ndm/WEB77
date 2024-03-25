import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    placeOfBirth: {
      type: String,
    },
    nationality: {
      type: String,
    },
    hobbies: {
      type: [String],
    },
    education: {},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
