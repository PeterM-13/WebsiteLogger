import { pool } from "../db/index.js";



// async function to add a visit
async function addVisit(url) {
  try {
    console.log("Adding visit for URL:", url);
    const results = await pool.query(
      `INSERT INTO SiteVisits (url, visits)
       VALUES ($1, 1)
       ON CONFLICT (url)
       DO UPDATE SET visits = SiteVisits.visits + 1
       RETURNING *;`,
      [url]
    );
    console.log("Query results:", results);
    const rows = results.rows[0];
    return rows;
  } catch (error) {
    console.error("Error adding visit:", error);
    throw error;
  }
}

// async function to add an email
async function addEmail(email) {
  try {
    console.log("Adding email:", email);
    const results = await pool.query(
      `INSERT INTO JDAemails (email)
       VALUES ($1)
       ON CONFLICT (email)
       DO NOTHING
       RETURNING *;`,
      [email]
    );
    console.log("Query results:", results);
    const rows = results.rows[0];
    return rows;
  } catch (error) {
    console.error("Error adding email:", error);
    throw error;
  }
}


export { addVisit, addEmail };
