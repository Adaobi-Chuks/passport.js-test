const { generateAuthToken } = require("../services/user.services");

module.exports.createUserToken = async (req, res) => {
  // Successful authentication, redirect home.
  const token = generateAuthToken(req.user);
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/api/v1/protected");
};