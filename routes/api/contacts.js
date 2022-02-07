const express = require("express");
const {
  validateSchema,
  favoriteValidate,
} = require("../../model/contacts/contact");
const contacts = require("../../controllers/contacts");
const { validation, ctrlWrapper, token } = require("../../middlewares");
const router = express.Router();

router.get("/", token, ctrlWrapper(contacts.getAll));

router.get("/:contactId", ctrlWrapper(contacts.getById));

router.post("/", token, validation(validateSchema), ctrlWrapper(contacts.add));

router.delete("/:contactId", ctrlWrapper(contacts.deleteById));

router.put(
  "/:contactId",
  validation(validateSchema),
  ctrlWrapper(contacts.putById)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteValidate),
  ctrlWrapper(contacts.patchFavorite)
);
module.exports = router;
