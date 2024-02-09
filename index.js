const express = require('express');
const mysql = require('mysql2/promise');

const userController  = require('./controller/users.js')

const app = express();
const port = 8000;

let conn; // Explicit declaration of the connection variable

const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'db',
            user: 'root',
            password: 'root',
            database: 'tutorial'
        });
        console.log('Connected to MySQL database successfully');
    } catch (error) {
        console.error('Failed to connect to MySQL database:', error);
        process.exit(1); // Exit the application if the database connection fails
    }
};

app.get('/user-all', userController.getAllUsers)

app.get('/data', (req, res) => {
    res.send('hello data');
});

app.get('/hello-world', (req, res) => {
  res.send('hello world');
});

app.get('/users', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        console.error('Failed to query the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running at http://localhost:${port}/`);
});
