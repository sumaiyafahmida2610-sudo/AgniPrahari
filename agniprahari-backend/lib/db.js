import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let initialized = false;

function ensureInit() {
  if (!initialized) {
    oracledb.initOracleClient({
      libDir: 'C:\\Users\\USER\\Desktop\\oracle\\instantclient\\instantclient_23_26',
    });
    initialized = true;
  }
}

export async function getConnection() {
  ensureInit();
  return oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
  });
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};