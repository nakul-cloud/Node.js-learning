const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const client = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

// SIGNUP
exports.signup = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await client.user.create({
    data: {
      username: req.body.username,
      password: hashed
    }
  });

  res.json(user);
};

// LOGIN
exports.login = async (req, res) => {
  const user = await client.user.findUnique({
    where: { username: req.body.username }
  });

  if (!user) return res.status(401).json("No user");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(401).json("Wrong password");

  const token = jwt.sign({ id: user.id }, "secret123");

  res.json({ token });
};