const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

// SIGNUP PAGE
exports.getSignup = (req, res) => {
  res.render("signup");
};

// SIGNUP POST
exports.postSignup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1,$2,$3,$4)",
    [
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      hashedPassword
    ]
  );

  res.redirect("/");
};

// LOGOUT
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};