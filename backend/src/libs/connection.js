import mariadb from 'mariadb';

export const getConnection = async () => {
  let conn;
  try {
    conn = await mariadb.createConnection(
      {
        host: 'localhost',
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
    );
    return conn;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};
