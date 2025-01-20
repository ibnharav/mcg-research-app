const sql = require('mssql');

// Database Configuration
const dbConfig = {
    user: process.env.DB_USER,        // Database username from .env
    password: process.env.DB_PASS,    // Database password from .env
    server: process.env.DB_HOST,      // Database server address from .env
    database: process.env.DB_NAME,    // Database name from .env
    options: {
        encrypt: true,                // Use encryption for data transfer
        trustServerCertificate: true  // Set to true for development (false for production)
    }
};

// Connect to the Database
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
        process.exit(1); // Exit the application on connection failure
    });

module.exports = {
    sql,
    poolPromise
};
