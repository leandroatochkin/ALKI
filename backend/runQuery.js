import getDb from "./api/db/db.js";

const db = getDb()

async function runQuery() {
  try {
    const result = await db.query(`
    DELETE FROM tenantUsers  WHERE email = 'shredartist@gmail.com';
        `);
    console.log(result[0]);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    db.end();
  }
}

runQuery();