const db = require("../db/queries");

// GET categories
exports.getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("categories", { categories });
};

// CREATE category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  await db.createCategory(name, description);
  res.redirect("/");
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect("/");
};