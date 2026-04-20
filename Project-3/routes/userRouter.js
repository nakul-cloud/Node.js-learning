const { Router } = require("express");
const controller = require("../controllers/userController");

const router = Router();

router.get("/join", controller.getJoin);
router.post("/join", controller.postJoin);

module.exports = router;