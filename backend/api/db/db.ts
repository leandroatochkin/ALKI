import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

const password =  process.env.DB_PASSWORD
const dbName = process.env.DB_NAME



// Create MySQL connection
export const db = mysql.createPool({
    host: 'host.docker.internal',
    user: 'root',
    password: password,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  



