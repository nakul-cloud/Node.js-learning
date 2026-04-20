const express = require("express");
const app = express();
const path = require("path");

const categoryRouter = require("./routes/categoryRouter");
const itemRouter = require("./routes/itemRouter");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use("/", categoryRouter);
app.use("/", itemRouter);

app.listen(3000, () => console.log("Server running"));