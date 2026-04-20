const db = require("../db/queries");

// VIEW items of category
exports.getItems = async (req, res) => {
  const { categoryId } = req.params;
  const items = await db.getItemsByCategory(categoryId);

  res.render("items", { items, categoryId });
};

// CREATE item
exports.createItem = async (req, res) => {
  const { name, description, price, category_id } = req.body;

  await db.createItem(name, description, price, category_id);

  res.redirect(`/items/${category_id}`);
};

// DELETE item
exports.deleteItem = async (req, res) => {
  const { id, categoryId } = req.params;

  await db.deleteItem(id);

  res.redirect(`/items/${categoryId}`);
};