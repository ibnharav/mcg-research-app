require('dotenv').config();



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const { sql, poolPromise } = require('./config/dbConfig'); // Import database config


// Middleware
app.use(bodyParser.json());

// Sample Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/customers', async (req, res) => {
    try {
        const pool = await poolPromise; // Use the connection pool
        const result = await pool.request().query('SELECT TOP 10 * FROM rates_feed.Rate'); // Test query
        res.json(result.recordset); // Send the query results back as JSON
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send(err.message); // Handle errors
    }
});
