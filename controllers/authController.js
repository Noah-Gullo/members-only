const db = require("../db/queries.js");
const passport = require('passport');

exports.handleSignUp = async(req, res, next) => {
    const newUser = await db.insertUser(req.body.firstname, req.body.lastname, req.body.username, req.body.password);
    req.login(newUser, (err) => {
        if(err){
            return next(err);
        }
        return res.redirect("/");
    })
}

exports.handleJoinMember = async(req, res) => {
    const password = req.body.password;
    if(password === process.env.MEMBER_PASSWORD){
        await db.becomeMember(req.user.id);
    }
    res.redirect("/");
}

exports.handleNewAdmin = async(req, res) => {
    const password = req.body.password;
    if(password === process.env.ADMIN_PASSWORD){
        await db.becomeAdmin(req.user.id);
    }
    res.redirect("/");
}

exports.handleLogin = passport.authenticate('local', {
    successRedirect: '/',          
    failureRedirect: '/login',     
    failureFlash: false            
});