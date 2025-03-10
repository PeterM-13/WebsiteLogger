import { pool } from "./index.js";

// function to create table
async function createTable() {
  return await pool.query(
    `CREATE TABLE cards 
      (
        card_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        image TEXT,
        profession TEXT,
        linkedin_username TEXT,
        github_username TEXT,
        email TEXT,
        phone TEXT,
        password TEXT
      );`
  );
}

// drop table if exists
async function dropTable() {
  return await pool.query("DROP TABLE IF EXISTS cards;");
}

// refill table with our data
async function refillTable() {
  return await pool.query(
    `INSERT INTO
    cards (first_name, last_name, image, profession, linkedin_username, github_username, email, phone, password)
    VALUES
      (
        'Roman',
        'Hadjisergis',
        'https://media-exp1.licdn.com/dms/image/C4E03AQESW-XZpUTkag/profile-displayphoto-shrink_200_200/0/1661709031700?e=1674691200&v=beta&t=GleE5LiuX5BTiHAnzckNXRh-twL17PN533avRDHUHWM',
        'DevOps Engineer',
        'roman-hadjisergis',
        'romanhadjisergis',
        'roman@roman.com',
        '+44 7000 0000',
        'pass'
      ),
      (
        'Elspeth',
        'Brown',
        'https://media-exp1.licdn.com/dms/image/C4D03AQGIUbB4ny1kqw/profile-displayphoto-shrink_100_100/0/1643843775517?e=1674691200&v=beta&t=pWD9BBqjikeTFknDMJWq8wTBcMMvckTVGNVk8pm46CY',
        'Full Stack Developer',
        'elspeth-brown',
        'Elspeth-57',
        'elspeth@elspeth.com',
        '+44 7000 0000',
        'pass'
      ),
      (
        'Cameron',
        'Mynett',
        'https://media-exp1.licdn.com/dms/image/C4E03AQEXLX9qq9xPyg/profile-displayphoto-shrink_200_200/0/1646163526730?e=1674691200&v=beta&t=IK-PY0AC_6r-YrDulPg2e5zsIxQb_2xAAxixcSXK2tQ',
        'DevOps Engineer',
        'cameron-mynett',
        'CameronMynett',
        'cameron@cameron.com',
        '+44 7000 0000',
        'pass'
      ),
      (
        'Peter',
        'Metcalfe',
        'https://media-exp1.licdn.com/dms/image/C4E03AQEbe5qeL9E7XQ/profile-displayphoto-shrink_200_200/0/1662214795490?e=1674691200&v=beta&t=9SfaE2IuC5NoarkXZ8qFWwi9nIE7-5LyFU6o0_6VVA0',
        'Full Stack Engineer',
        'peter-metcalfe-1me',
        'PeterM-13',
        'peter@peter.com',
        '+44 7000 0000',
        'pass'
      ),
      (
        'Ben',
        'Lloyd',
        'https://media-exp1.licdn.com/dms/image/D4E03AQGAm-_-96TjdQ/profile-displayphoto-shrink_200_200/0/1669112547798?e=1674691200&v=beta&t=VCofBoCgez1pWbi1LbA9N_C7w_7RHUN0cx53NEGiEQI',
        'Full Stack Engineer',
        'benll6yd',
        'conwys',
        'ben@ben.com',
        '+44 7000 0000',
        'pass'
      );`
  );
}

// reset the database
async function resetTable() {
  return [await dropTable(), await createTable(), await refillTable()];
}

export { createTable, dropTable, refillTable, resetTable };
