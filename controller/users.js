const axios = require('axios');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            res.send(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while fetching data.');
        }
    },
};
