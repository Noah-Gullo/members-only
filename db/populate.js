#! .env
const { Client } = require("pg");
const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  member_status VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL
);

CREATE TABLE messages(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.ROLE_USER}:${process.env.ROLE_PASSWORD}@localhost:5432/members`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();