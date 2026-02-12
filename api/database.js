
const mysql = require("mysql2"); // andmebaasiga ühenduse loomise jaks

require("dotenv").config();

const pool = mysql.createPool({ // loob ühenduse
    host : process.env.HOST, 
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE_NAME
});

function check() { // kontroll kas andmebaas töötab
    pool.query("select * from energyreading"); // saadab andmebaasise päringut
    return "Database: I am alive"; // tagastab sõnet
}

async function createEntry(time, location, price, source, createdAt) { // ignoreerige seda

    try {
        pool.query(`insert into energyreading (timestamp, location, price_eur_mwh, source, created_at)
            values('${time}', '${location}', ${price}, '${source}', '${createdAt}')`);
        // console.log("logged a line");
        // pidi sisestama andmebaasisse andmeid, aga ei tööta
    } catch (error) {
        console.log(error);
    }

}

console.log(check()); // loggib sisse funktsiooni tagastusväärtust

module.exports = {createEntry};