const express = require("express");
const router = express.Router();
const users = require("../../controllers/users");
const {
  registerSchema,
  subscriptionSchema,
  User,
} = require("../../model/user");
const { validation, ctrlWrapper, token, upload } = require("../../middlewares");
const path = require("path");
const fs = require("fs/promises");
// router
router.post("/signup", validation(registerSchema), ctrlWrapper(users.signup));
router.post("/login", validation(registerSchema), ctrlWrapper(users.signin));
router.get("/logout", token, ctrlWrapper(users.logout));
router.get("/current", token, ctrlWrapper(users.getCurrent));
router.patch(
  "/subscription",
  token,
  validation(subscriptionSchema),
  ctrlWrapper(users.patchSub)
);
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
router.patch(
  "/avatars",
  token,
  upload.single("avatar"),
  async (req, res, next) => {
    const { _id } = req.users;
    const { patch: tempUpload, filename } = req.file;
    try {
      const [extention] = filename.split(".").reverse();
      const newFileName = `${_id}.${extention}`;
      const resultUpload = path.join(avatarsDir, newFileName);
      await fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join("avatars", newFileName);
      await User.findByIdAndUpdate(_id, { avatarURL });
      res.json({
        avatarURL,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
module.exports = router;
