const { Router } = require("express");
const controller = require("../controllers/categoryController");

const router = Router();

router.get("/", controller.getCategories);
router.post("/create", controller.createCategory);
router.get("/delete/:id", controller.deleteCategory);

module.exports = router;