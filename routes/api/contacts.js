const express = require("express");
const {
  Contact,
  validateSchema,
  favoriteValidate,
} = require("../../model/contacts/contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await Contact.find({});
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: result },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404).json({ message: `Not found contact with ID:${id}` });
  }
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: contact },
  });
});

router.post("/", async (req, res, next) => {
  const validationResult = validateSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ status: validationResult.error.details });
  }
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: { result: newContact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const deleteContact = await Contact.findByIdAndRemove(id);
  if (deleteContact === null) {
    res.status(404).json({ message: `Not found contact with ID:${id}` });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const validationResult = validateSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ status: validationResult.error.details });
  }
  const id = req.params.contactId;
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: updateContact },
  });
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const validationResult = favoriteValidate.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ status: validationResult.error.details });
  }
  const id = req.params.contactId;
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: updateContact },
  });
});
module.exports = router;
