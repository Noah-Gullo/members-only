#! .env

const { Pool } = require('pg');

module.exports = new Pool({
    host: "localhost", 
    user: process.env.USER,
    database: "members",
    password: process.env.password,
    port: 5432 
})