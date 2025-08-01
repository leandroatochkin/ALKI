import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
let pool = null;
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const caPath = isProduction
  ? '/etc/secrets/ca.pem'  // ✅ this is where Render mounts it
  : path.join(process.cwd(), 'secrets/ca.pem');

const getDb = () => {
    console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
});
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST, // RDS endpoint (e.g., mydb.xxxxxx.rds.amazonaws.com)
            user: process.env.DB_USER || 'root',
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
             ssl: {
                ca: fs.readFileSync(caPath)
            },
        });

    }
    return pool;
};

export default getDb;