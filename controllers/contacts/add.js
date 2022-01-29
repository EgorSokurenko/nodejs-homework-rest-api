const Contact = require("../../model/contacts/contact");
const add = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: { result: newContact },
  });
};
module.exports = { add };
