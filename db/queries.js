const pool = require("./pool.js");
const bcrypt = require('bcryptjs');

async function insertUser(first, last, username, password){
    try{
        const hashed = await bcrypt.hash(password, 10);
        const user =  await pool.query(`INSERT INTO users (first_name, last_name, username, password, member_status, admin)
                         VALUES ($1, $2, $3, $4, 'user', false) RETURNING *`, [first, last, username, hashed]);
        return user.rows[0];
    }catch(error){
        console.log(error);
    }
}

async function becomeMember(){

}

module.exports = {
    insertUser,
    becomeMember,
};