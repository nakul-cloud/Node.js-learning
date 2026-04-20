const express = require("express");
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");
const userRouter = require("./routes/userRouter");

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

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/", authRouter);
app.use("/messages", messageRouter);
app.use("/user", userRouter);

// HOME
const pool = require("./db/pool");

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    const user = rows[0];
    if (!user) return done(null, false);

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return done(null, rows[0] || null);
  } catch (err) {
    return done(err);
  }
});

app.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT messages.*, users.first_name FROM messages JOIN users ON messages.user_id = users.id"
  );

  res.render("index", {
    user: req.user,
    messages: rows
  });
});

app.listen(3000, () => console.log("Server running"));