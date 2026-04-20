const pool = require("./pool");

// CATEGORY

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function createCategory(name, description) {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description]
  );
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id=$1", [id]);
}

// ITEMS

async function getItemsByCategory(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id=$1",
    [categoryId]
  );
  return rows;
}

async function createItem(name, desc, price, category_id) {
  await pool.query(
    "INSERT INTO items (name, description, price, category_id) VALUES ($1,$2,$3,$4)",
    [name, desc, price, category_id]
  );
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  getItemsByCategory,
  createItem
};