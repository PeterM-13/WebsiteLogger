import pg from "pg";

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err, client) => {
  console.log(`Error received on db pool: ${err.message} \n ${err.stack}`);
});
