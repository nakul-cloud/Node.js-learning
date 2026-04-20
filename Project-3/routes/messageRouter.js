const { Router } = require("express");
const controller = require("../controllers/messageController");

const router = Router();

router.get("/new", controller.getNew);
router.post("/new", controller.postNew);
router.get("/delete/:id", controller.deleteMessage);

module.exports = router;