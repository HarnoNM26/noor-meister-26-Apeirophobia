const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));

app.use("/assets", express.static("assets"));

app.set("view engine", "ejs");

app.get("/index", async (req, res) => {
    const sisu = await fetch("http://localhost:3001/index")
    console.log(sisu);
    res.render("index", {sisu: "null"});
});

app.listen(3002);