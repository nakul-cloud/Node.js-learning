const express = require("express");
const app = express();

app.use(express.json());

const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");

app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(3000, () => console.log("Server running"));