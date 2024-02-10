const mysql = require('mysql2/promise');
require('dotenv').config()

const dbConfig = {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME
};

async function initMySQL() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        return conn;
    } catch (error) {
        process.exit(1);
    }
}


module.exports = {
    initMySQL
};