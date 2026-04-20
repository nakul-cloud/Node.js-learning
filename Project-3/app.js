const express = require("express");
const path = require("path");

const session = require("express-session");
const passport = require("passport");

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

app.use(passport.session());

// ROUTES
app.use("/", authRouter);
app.use("/messages", messageRouter);
app.use("/user", userRouter);

// HOME
const pool = require("./db/pool");

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