const Contact = require("../../model/contacts/contact");
const getAll = async (req, res, next) => {
  const result = await Contact.find({});
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: result },
  });
};
module.exports = { getAll };
