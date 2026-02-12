const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({extended: false}));

app.use("/assets", express.static("assets"));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/index", async (req, res) => { // index päringu põhjal
    const response = await fetch("http://localhost:3001/index") // pärime andmeid API serverist
    const data = await response.json(); // muudan vastust JSON'iks
    //console.log(data);
    res.render("index", {sisu: data}); // tagastan Index vaade ning saadan vaatesse JSON'it
});

app.get("/import", (req, res) => { // import päringu põhjal
    res.render("import"); // tagastan Import vaade
})

app.post("/import", async (req, res) => { // vormi esitamisel 
    console.log(req.body); // logi
    /* var data = new FormData() // loon uue FormData
    var payload = { // Defineerin JSON payload'i
        "data": fs.readFileSync("../api/energy_dump.json")// filename on vormis valitud faili nimi
    }
    console.log(payload); // logi
    data.append("json", JSON.stringify(payload)); // lisa JSON payload'i data muutujasse

    console.log(data); // logi
    const response = fetch("http://localhost:3001/import", {
        method: "post",
        header: { "Content-Type" : "application/json" },
        body: data
    }); // kutsub post päringut API Serveris. Body ei tööta.
    */
   const response = fetch("http://localhost:3001/import", {
        method: "post",
   })
    
    // res.send(data);
    res.redirect("index"); // Suunab üle index päringule
})

app.get("/external", async (req, res) => {

    res.render("external");
})

app.get("/externalandmed", async (req, res) => {
    const response = await fetch("http://localhost:3001/external");
    const data = await response.json();
    res.render("externalandmed", {sisu: data});
})
app.listen(3002); // Server kuulab porti 3002