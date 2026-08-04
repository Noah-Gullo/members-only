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

async function becomeMember(userID){
    try{
        await pool.query('UPDATE users SET member_status = $2 WHERE id=$1', [userID, 'member']);
    }catch(error){
        console.log(error);
    }
}

async function becomeAdmin(userID){
    try{
        await pool.query('UPDATE users SET admin=$2 WHERE id=$1', [userID, true]);
    }catch(error){
        console.log(error);
    }
}

async function addMessage(userID, title, message){
    try{
        await pool.query('INSERT INTO messages (user_id, title, text, timestamp) VALUES ($1, $2, $3, $4)', [userID, title, message, new Date()]);
    }catch(error){
        console.log(error);
    }
}

async function getMessages(){
    try{
        const {rows} = await pool.query('SELECT messages.*, users.first_name, users.last_name FROM messages INNER JOIN users on messages.user_id = users.id');
        return rows;
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    insertUser,
    becomeMember,
    becomeAdmin,
    addMessage,
    getMessages
};