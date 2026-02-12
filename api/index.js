const express = require("express"); // Import express
const app = express(); // Launch an app
const fs = require("fs");

const { createEntry } = require("./database.js");

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/index', async (req, res) => { // kui tehakse get päring
    // const response = await fetch(`${__dirname}/suvakas.json`);
    // const data = response.json();
    // console.log(data);

    const response = fs.readFileSync("./energy_dump.json"); // loeb andmed antud failist
    //console.log(response); // logi
    console.log("API Server: I am alive"); // teine logi
    res.send(response); // Saada andmed üle
});

app.post("/import", async (req, res) => {
    console.log("API Server: POST Import"); // logi 
    baseFile = `${__dirname}\\energy_dump.json`;
    console.log(baseFile);
    try {
        const response = fs.readFileSync(baseFile);
        const data = await JSON.parse(response); 
        
        data.forEach(obj => {
            //console.log(obj.timestamp, obj.location, obj.price_eur_mwh, "API", Date.now());
            createEntry(obj.timestamp, obj.location, obj.price_eur_mwh, "API", Date.now());

        });
        
    } catch (error) {
        console.error(error);
    }
    
    
});

app.get("/external", async (req, res) => {
    const baseUrl = "https://dashboard.elering.ee";
    const response = await fetch(`${baseUrl}/api/nps/price`);
    const data = await response.json();

    data.data.ee.forEach(entry => {
        for (key in entry) {
            if (key === "timestamp") {
                var date = new Date(entry[key] * 1000)
                
                var year = date.getFullYear();
                var month = "0" + date.getMonth()
                var day = "0" + date.getDay();
                var hours = "0" + date.getHours();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                
                var formattedTime =
                day.substr(-2) + "." +
                month.substr(-2) + "." + year + 
                 " " + hours.substr(-2) + ":" 
                 + minutes.substr(-2) + ":" + seconds.substr(-2);
                
                entry[key] = formattedTime;
            }
        console.log(entry);

        }
        
    })

    res.send(data);
});

app.listen(3001) // Server kuulab porti 3001