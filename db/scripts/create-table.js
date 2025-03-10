import { createTable } from "../helpers.js";
import { pool } from "../index.js";

try {
  await createTable();
  console.log("Created 'cards' table");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
