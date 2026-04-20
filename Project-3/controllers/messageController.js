const pool = require("../db/pool");

// NEW MESSAGE PAGE
exports.getNew = (req, res) => {
  if (!req.user) return res.redirect("/");
  res.render("newMessage");
};

// CREATE MESSAGE
exports.postNew = async (req, res) => {
  await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1,$2,$3)",
    [req.body.title, req.body.text, req.user.id]
  );

  res.redirect("/");
};

// DELETE MESSAGE
exports.deleteMessage = async (req, res) => {
  if (!req.user.is_admin) return res.redirect("/");

  await pool.query("DELETE FROM messages WHERE id = $1", [
    req.params.id
  ]);

  res.redirect("/");
};