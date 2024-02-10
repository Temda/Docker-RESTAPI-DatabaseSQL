const axios = require('axios');
const { initMySQL } = require('../config/connectDB');


module.exports = {
    getConnectDabase: async (req, res) => {
            try {
                const conn = await initMySQL();
                const [results] = await conn.query('SELECT * FROM users');
                res.json(results);
            } catch (error) {
                console.error('Failed to query the database:', error);
                res.status(500).send('Internal Server Error');
            }
    },

    getUsersById: async (req, res) => {
        try {
            const id = req.params.id
            const conn = await initMySQL();
            const [results] = await conn.query('SELECT * FROM users WHERE id=?', [id]);
            res.json(results);
        } catch (error) {
            console.error('Failed to query the database:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};
