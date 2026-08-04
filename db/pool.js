#! .env

const { Pool } = require('pg');

module.exports = new Pool({
    host: "localhost", 
    user: process.env.ROLE_USER,
    database: "members",
    password: process.env.ROLE_PASSWORD,
    port: 5432 
})