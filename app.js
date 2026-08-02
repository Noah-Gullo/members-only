const express = require('express');
const app = express();
const PORT = 3000;
const path = require("node:path");
const indexRouter = require('./routes/indexRouter');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.get("*error", (req, res) => {
    if(res.status(404)){
        res.render("404.ejs");
    }
})

app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    
    console.log(`Listening on ${PORT}`);
})