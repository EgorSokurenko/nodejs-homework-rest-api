const express = require("express");
const router = express.Router();
const users = require("../../controllers/users");
const { registerSchema, subscriptionSchema } = require("../../model/user");
const { validation, ctrlWrapper, token } = require("../../middlewares");
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
module.exports = router;
