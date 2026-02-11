
const {Pool, Client} = require("pg");

env = require("dotenv");

const pool = new Pool();

async function check() {
    let res = await pool.query("SELECT $1::text as message", ["Hello world!"]);
    console.log(res.rows[0].message);

    pool.end();
    const client = new Client().connect();

    res = await client.query("SELECT $1::text as message", ["Hello world!"]);
    console.log(res.rows[0].message);
    await client.end();
}

check()