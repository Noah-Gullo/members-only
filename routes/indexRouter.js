const { Router } = require('express');
const { signUpRules } = require('../controllers/validator.js');
const { handleSignUp, handleJoinMember, handleNewAdmin, handleLogin } = require('../controllers/authController.js');
const { handleGetMessages, handleNewMessage, handleDeleteMessage } = require("../controllers/messageController.js");
const indexRouter = Router();

indexRouter.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

indexRouter.get("/", async(req, res) => { 
    const messages = await handleGetMessages()
    res.render("index.ejs", {user: req.user, messages: messages});
});

indexRouter.get("/sign-up", (req, res) => {res.render('signUpForm.ejs')});
indexRouter.post("/sign-up", signUpRules, handleSignUp);

indexRouter.get("/login", (req, res) => {res.render('loginForm.ejs', {user: req.user})});
indexRouter.post("/login", handleLogin);

indexRouter.get("/join-member", (req, res) => {res.render('becomeMember.ejs', {user: req.user})});
indexRouter.post("/join-member", handleJoinMember);

indexRouter.get("/new-admin", (req, res) => {res.render('becomeAdmin.ejs', {user: req.user})});
indexRouter.post("/new-admin", handleNewAdmin);

indexRouter.get("/new-message", (req, res) => {res.render('newMessageForm.ejs')});
indexRouter.post("/new-message", handleNewMessage);

indexRouter.post("/delete/:messageID", handleDeleteMessage);

indexRouter.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = indexRouter;