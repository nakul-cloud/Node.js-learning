const { Router } = require("express");
const controller = require("../controllers.js/usersController");

const router = Router();

router.get("/", controller.getUsers);
router.get("/new", controller.getForm);
router.post("/new", controller.createUser);

router.get("/delete", controller.deleteUsers);

module.exports = router;