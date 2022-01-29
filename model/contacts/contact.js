const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
const validateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "org", "net", "ca"] },
    }),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const favoriteValidate = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contact = model("contact", contactSchema);
module.exports = { Contact, validateSchema, favoriteValidate };
