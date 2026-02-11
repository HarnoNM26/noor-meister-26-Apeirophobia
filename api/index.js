const express = require("express"); // Import express
const app = express(); // Launch an app
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get('/api/health', (req, res) => {

    res.send("healthCheck"); 
});

app.get('')
app.get('/index', async (req, res) => { // kui tehakse get päring
    // const response = await fetch(`${__dirname}/suvakas.json`);
    // const data = response.json();
    // console.log(data);

    const response = fs.readFileSync("./energy_dump.json"); // loeb andmed antud failist
    console.log(response); // logi
    console.log("API Server: I am alive"); // teine logi
    res.send(response); // Saada andmed üle
});

app.post("/import", (req, res) => {
    console.log("API Server: POST Import", req.body) // logi 
    
})
app.listen(3001) // Server kuulab porti 3001