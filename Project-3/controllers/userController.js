const pool = require("../db/pool");

// JOIN CLUB PAGE
exports.getJoin = (req, res) => {
  res.render("join");
};

// JOIN CLUB POST
exports.postJoin = async (req, res) => {
  if (req.body.passcode === "club123") {
    await pool.query(
      "UPDATE users SET membership = true WHERE id = $1",
      [req.user.id]
    );
  }

  res.redirect("/");
};