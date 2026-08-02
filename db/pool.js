#! .env

const { Pool } = require('pg');

module.exports = new Pool({
    host: "localhost", 
    user: process.env.USER,
    database: "top_users",
    password: process.env.password,
    port: 5432 
})