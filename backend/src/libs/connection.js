import mariadb from 'mariadb';

export const DB_CONNECTION_KEY = 'dbConnection';

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'quackerUser',
  password: 'quackerPassword',
  database: 'quacker',
  connectionLimit: 5,
});

const getConnection = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    throw err;
  }
};

export const addDbToRequest = async (req, res, next) => {
  const connection = await getConnection();
  req[DB_CONNECTION_KEY] = connection;
  next();
};

export const terminateDbConnection = async (req, res, next) => {
  if (req[DB_CONNECTION_KEY]) {
    req[DB_CONNECTION_KEY].end();
  }
  next();
};
