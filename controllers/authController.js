const db = require("../db/queries.js");
const passport = require('passport');

exports.handleSignUp = async(req, res, next) => {
    const newUser = await db.insertUser(req.body.firstname, req.body.lastname, req.body.username, req.body.password);
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
}

exports.handleJoinMember = async(req, res) => {
    const password = req.body.password;
    if(password === process.env.MEMBER_PASSWORD){
        
    }
    res.redirect("/")
}

exports.handleLogin = passport.authenticate('local', {
    successRedirect: '/',          
    failureRedirect: '/login',     
    failureFlash: false            
});