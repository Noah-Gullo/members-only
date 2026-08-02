const { Router } = require('express');
const indexRouter = Router();

indexRouter.get("/", (req, res) => {res.render("index.ejs")});

module.exports = indexRouter;