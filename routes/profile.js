import { Router } from "express";
import checkProfileOwnership from "../middlewares/checkOwnership";
import {
  createProfile,
  getProfileById,
  removeProfile,
  updateProfile,
} from "../controllers/profile";
import { checkPermission } from "../middlewares/checkPermission";

const profileRouter = Router();

profileRouter.get("/:id", getProfileById);

// ! Check profile ownership for method: DELETE, PUT, POST
profileRouter.use(checkPermission, checkProfileOwnership);

profileRouter.post("/", createProfile);
profileRouter.put("/:id", updateProfile);
profileRouter.delete("/:id", removeProfile);

export default profileRouter;
