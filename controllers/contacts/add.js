const { Contact } = require("../../model/contacts/contact");
const add = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "succsess",
    code: 200,
    data: { result: newContact },
  });
};
module.exports = { add };
