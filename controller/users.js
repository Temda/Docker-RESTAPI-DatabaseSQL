const axios = require('axios');
const { initMySQL } = require('../config/connectDB');


module.exports = {
    getUsersAll: async (req, res) => {
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
            const {
                id
            } = req.params
            const conn = await initMySQL();
            const [results] = await conn.query('SELECT * FROM users WHERE id=?', [id]);
            res.json(results);
        } catch (error) {
            console.error('Failed to query the database:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    createUsers: async (req, res) => {
        try {
            const {
                name
            } = req.body
            // console.log(name);
            const conn = await initMySQL();
            const result = await conn.execute('INSERT INTO users (full_name) VALUES (?)', [name]);
            await conn.end();
            res.status(201).json({ message: `User ${name} created successfully`, result: result });

        } catch (error) {
            console.error('Failed to query the database:', error);
            res.status(500).send('Internal Server Error');
        }

    },

    updateUsers: async (req, res) => {
        try {
            const { 
                id
            } = req.params
            const {
                name
            } = req.body
            // console.log(id);
            const conn = await initMySQL();
            const result = await conn.query('UPDATE users SET full_name=? WHERE id = ?', [name, id]);
            await conn.end();
            res.status(200).json({ message: `User ${name} update successfully`, result: result });

        } catch (error) {
            console.error('Failed to query the database:', error);
            res.status(500).send('Internal Server Error');
        }

    },

    deleteUsers: async (req, res) => {
        try {
            const {
                id
            } = req.params

            const conn = await initMySQL();
            const [result] = await conn.execute('DELETE FROM users WHERE id=?', [id]);
            await conn.end();
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully'});

        } catch (error) {
            console.error('Failed to query the database:', error);
            res.status(500).send('Internal Server Error');
        }
    },

};
