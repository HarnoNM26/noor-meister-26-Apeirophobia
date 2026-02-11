const express = require("express"); // Import express
const app = express(); // Launch an app

app.use(express.json());

app.get('/api/health', (req, res) => {

    res.send("healthCheck"); 
});

app.get('/index', async (req, res) => { // kui tehakse get päring
    // const response = await fetch(`${__dirname}/suvakas.json`);
    // const data = response.json();
    // console.log(data);
    res.send("I am alive"); // Saada sõnumit
});
app.listen(3001) // Set an active port 