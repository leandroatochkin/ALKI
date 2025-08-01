import getDb from "./api/db/db.js";

const db = getDb()

async function runQuery() {
  try {
    const result = await db.query(`
    UPDATE users SET permissions = 'admin' WHERE email = 'leandronatochkin@gmail.com';
        `);
    console.log(result[0]);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    db.end();
  }
}

runQuery();