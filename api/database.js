
const mysql = require("mysql2"); // andmebaasiga ühenduse loomise jaks

const pool = mysql.createPool({ // loob ühenduse
    host : 'localhost', 
    user : 'root',
    password : '',
    database : 'iec'
});

function check() { // kontroll kas andmebaas töötab
    pool.query("select * from energyreading"); // saadab andmebaasise päringut
    return "Database: I am alive"; // tagastab sõnet
}

function createEntry() { // ignoreerige seda
    
    return;
}

console.log(check()); // loggib sisse funktsiooni tagastusväärtust