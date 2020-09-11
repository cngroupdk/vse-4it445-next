import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
  );
  if (await argon2.verify(dbResponse[0].password, password)) {

    const token = createToken({ id: dbResponse[0].id });
    return {
      user: { ...dbResponse[0] },
      token,
    };
  }
}

export const signup = async (
  _,
  { email, password, name, screenName, profileImageUrl },
  { dbConnection },
) => {
  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (id, email, password, name, screenName, profileImageUrl) 
    VALUES (NULL, ?, ?, ?, ?, ?);`,
    [email, passwordHash, name, screenName, profileImageUrl],
  );

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    id: dbResponse.insertId,
    email,
    name: name,
    screenName: screenName,
    profileImageUrl: profileImageUrl,
  };

  return { user: userObject, token: token };
}
