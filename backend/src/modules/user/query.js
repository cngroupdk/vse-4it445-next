
export const users = async (_, __, { dbConnection }) => {
  const users = await dbConnection.query('SELECT * FROM user');
  return users;
}

export const user = async (_, { screenName }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE screenName = ?`, [
      screenName,
    ])
  )[0];
  if (!user) {
    return null;
  }
  return user;
}
