const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// validation
const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username required")
];

// GET /
exports.getUsers = async (req, res) => {
  const search = req.query.search;

  let users;

  if (search) {
    users = await db.searchUsernames(search);
  } else {
    users = await db.getAllUsernames();
  }

  res.render("index", { users });
};

// GET /new
exports.getForm = (req, res) => {
  res.render("form");
};

// POST /new
exports.createUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("form", {
        errors: errors.array(),
      });
    }

    const { username } = req.body;

    await db.insertUsername(username);

    res.redirect("/");
  }
];

// DELETE
exports.deleteUsers = async (req, res) => {
  await db.deleteAllUsers();
  res.redirect("/");
};