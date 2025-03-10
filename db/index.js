import pg from "pg";

export const pool = new pg.Pool({
  connectionString: 'postgresql://postgres:xxlNJFjKWY8IU6kJ@socially-heuristic-fish.data-1.use1.tembo.io:5432/postgres',//process.env.DATABASE_URL,
  min: 0,
  max: 10,
});
