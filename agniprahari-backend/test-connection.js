require('dotenv').config({ path: '.env.local' });
const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: 'C:\\Users\\USER\\Desktop\\oracle\\instantclient\\instantclient_23_26' });

async function test() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    console.log('SUCCESS! Connected to Oracle.');
    await connection.close();
  } catch (err) {
    console.log('CONNECTION FAILED:');
    console.log(err.message);
  }
}

test();