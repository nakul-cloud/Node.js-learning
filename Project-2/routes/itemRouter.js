const { Router } = require("express");
const controller = require("../controllers/itemController");

const router = Router();

router.get("/:categoryId", controller.getItems);
router.post("/create", controller.createItem);
router.get("/delete/:id/:categoryId", controller.deleteItem);

module.exports = router;