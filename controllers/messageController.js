const db = require("../db/queries.js");

async function handleNewMessage(req, res) {
    await db.addMessage(req.user.id, req.body.title, req.body.text);
    res.redirect("/");
}

async function handleGetMessages(){
    const messages = await db.getMessages();
    return messages;
}

module.exports = {
    handleNewMessage,
    handleGetMessages
}