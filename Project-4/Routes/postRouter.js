const { Router } = require("express");
const controller = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");

const router = Router();

router.get("/", controller.getPosts);
router.post("/", auth, controller.createPost);

module.exports = router;