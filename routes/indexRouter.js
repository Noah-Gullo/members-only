const { Router } = require('express');
const { signUpRules } = require('../controllers/validator.js');
const { handleSignUp } = require('../controllers/authController.js');
const indexRouter = Router();

indexRouter.get("/", (req, res) => {res.render("index.ejs")});

indexRouter.get("/sign-up", (req, res) => {res.render('signUpForm.ejs')});
indexRouter.post("/sign-up", signUpRules, handleSignUp);

module.exports = indexRouter;