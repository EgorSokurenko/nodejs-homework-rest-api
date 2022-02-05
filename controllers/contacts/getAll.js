const { Contact } = require("../../model/contacts/contact");
const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owned: _id }, "", {
    skip,
    limit: +limit,
  });
  res.status(200).json({
    status: "succsess",
    code: 200,
    data: { result: result },
  });
};
module.exports = { getAll };
