const mysql = require('mysql2/promise');
require("dotenv").config();



const conection =mysql.createPool({
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT_DB,
    password: process.env.PASSWORD_DB,
});


module.exports = conection;