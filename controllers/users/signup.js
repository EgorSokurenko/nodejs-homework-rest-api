const bcrypt = require("bcrypt");
const { User } = require("../../model/user");
const { Conflict } = require("http-errors");
const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already created`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    code: 201,
    data: {
      user: {
        email: email,
        subscription: "starter",
      },
    },
  });
};
module.exports = { signup };
