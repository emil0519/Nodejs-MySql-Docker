import mysql from 'mysql';
import dotenv from 'dotenv'; 
// call .env
dotenv.config();
// Pool of connection?
const pool = mysql.createPool({
    // define in process, can pass in, no hard code
    // url of database
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // how many connection we can have in this pool, case by case
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    // if connection limit is reached, request can be queue up to the limit
    // queueLimit: process.env.DB_CONNECTION_LIMIT
});

export default pool;