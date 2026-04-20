const pool = require("./pool");

// GET all
async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

// INSERT
async function insertUsername(username) {
  await pool.query(
    "INSERT INTO usernames (username) VALUES ($1)",
    [username]
  );
}

// SEARCH (SQL)
async function searchUsernames(search) {
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username ILIKE $1",
    [`%${search}%`]
  );
  return rows;
}

// DELETE ALL
async function deleteAllUsers() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUsernames,
  deleteAllUsers
};