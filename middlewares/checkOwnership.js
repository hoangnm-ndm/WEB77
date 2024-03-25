import Profile from "../models/Profile.js";

const checkProfileOwnership = async (req, res, next) => {
  try {
    // user này vefify từ token ra rồi
    const userId = req.user._id;
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ error: "Khong tim thay profile" });
    }

    if (profile.userId.toString() !== userId) {
      return res.status(403).json({ error: "Ban khong co quyen" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkProfileOwnership;
