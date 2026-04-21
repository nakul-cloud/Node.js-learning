const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

// CREATE POST (protected)
exports.createPost = async (req, res) => {
  const post = await client.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      authorId: req.user.id
    }
  });

  res.json(post);
};

// GET ALL POSTS (public only published)
exports.getPosts = async (req, res) => {
  const posts = await client.post.findMany({
    where: { published: true }
  });

  res.json(posts);
};