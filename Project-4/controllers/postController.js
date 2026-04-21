const prisma = require("@prisma/client").PrismaClient;
const client = new prisma();

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