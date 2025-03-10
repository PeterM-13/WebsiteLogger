import { pool } from "../db/index.js";



// async function to add a visit
async function addVisit(url) {
  const results = await pool.query(
    `INSERT INTO SiteVisits (url, visits)
     VALUES ($1, 1)
     ON CONFLICT (url)
     DO UPDATE SET visits = SiteVisits.visits + 1
     RETURNING *;`,
    [url]
  );
  const rows = results.rows[0];
  return rows;
}

// async function to add an email
async function addEmail(email) {
  const results = await pool.query(
    `INSERT INTO JDAemails (email)
     VALUES ($1)
     ON CONFLICT (email)
     DO NOTHING
     RETURNING *;`,
    [email]
  );
  const rows = results.rows[0];
  return rows;
}


export { addVisit, addEmail };
