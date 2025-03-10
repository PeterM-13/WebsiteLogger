import { pool } from "../index.js";
import { resetTable } from "../helpers.js";

try {
  await resetTable();
  console.log("Dropped, re-created and re-seeded 'cards' table");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}