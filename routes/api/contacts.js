const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  if (!contacts) {
    res.json({ message: "template message" });
  }
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: result },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contacts.getContactById(id);
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
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uk", "org", "net", "ca"] },
      }),
    phone: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ status: validationResult.error.details });
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: { result: newContact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const deleteContact = await contacts.removeContact(id);
  if (deleteContact === null) {
    res.status(404).json({ message: `Not found contact with ID:${id}` });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "org", "net", "ca"] },
    }),
    phone: Joi.string(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ status: validationResult.error.details });
  }
  const id = req.params.contactId;
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  const updateContact = await contacts.updateContact(id, req.body);
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
