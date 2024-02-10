const express = require('express');
require('dotenv').config()
const { initMySQL } = require('./config/connectDB')
const UserRouter = require('./routers/users')

const app = express();

app.get('/', (req, res) => {
  res.json('hello world');
});

app.use('/users', UserRouter)


async function startServer() {
    try {
        await initMySQL();
        console.log('Database connected successfully.');
        app.listen(process.env.PORT, () => {
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        });
    } catch (error)  {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
}

startServer()
