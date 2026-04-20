const express = require("express");
const path = require("path");
const pool = require("./db/pool");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const app = express();

// VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.session());

// PASSPORT STRATEGY
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = rows[0];

      if (!user) return done(null, false);

      const match = await bcrypt.compare(password, user.password);

      if (!match) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// SESSION
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  done(null, rows[0]);
});

// ROUTES

// HOME
app.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT messages.*, users.first_name FROM messages JOIN users ON messages.user_id = users.id"
  );

  res.render("index", {
    user: req.user,
    messages: rows
  });
});

// SIGN UP
app.get("/sign-up", (req, res) => {
  res.render("signup");
});

app.post("/sign-up", async (req, res) => {
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
});

// LOGIN
app.post("/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

// LOGOUT
app.get("/log-out", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// JOIN CLUB
app.get("/join", (req, res) => {
  res.render("join");
});

app.post("/join", async (req, res) => {
  if (req.body.passcode === "club123") {
    await pool.query(
      "UPDATE users SET membership = true WHERE id = $1",
      [req.user.id]
    );
  }
  res.redirect("/");
});

// NEW MESSAGE
app.get("/new", (req, res) => {
  if (!req.user) return res.redirect("/");
  res.render("newMessage");
});

app.post("/new", async (req, res) => {
  await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1,$2,$3)",
    [req.body.title, req.body.text, req.user.id]
  );

  res.redirect("/");
});

// DELETE (ADMIN)
app.get("/delete/:id", async (req, res) => {
  if (!req.user.is_admin) return res.redirect("/");

  await pool.query("DELETE FROM messages WHERE id = $1", [
    req.params.id
  ]);

  res.redirect("/");
});

// SERVER
app.listen(3000, () => console.log("Server running"));