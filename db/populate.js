#! .env
const { Client } = require("pg");
const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  member_status VARCHAR(255) NOT NULL
);

CREATE TABLE messages(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

INSERT INTO users(first_name, last_name, username, password, member_status) VALUES
('John', 'Doe', 'jdoe@gmail.com', 'password', 'user');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/members`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();