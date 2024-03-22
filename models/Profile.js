import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Profile", profileSchema);
