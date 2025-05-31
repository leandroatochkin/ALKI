import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
let pool = null;
const getDb = () => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST, // RDS endpoint (e.g., mydb.xxxxxx.rds.amazonaws.com)
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
};

export default getDb;