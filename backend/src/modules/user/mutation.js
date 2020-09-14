import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
  );
  const user = dbResponse[0];
  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });
    return {
      user: { ...user },
      token,
    };
  }
};

export const signup = async (
  _,
  { email, password, name, username, profileImageUrl },
  { dbConnection },
) => {
  const userByUsername = (
    await dbConnection.query(`SELECT * FROM user WHERE username = ?`, [
      username,
    ])
  )[0];

  console.log('userByUsername', userByUsername);

  if (userByUsername) {
    throw new Error('Username already taken');
  }

  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (id, email, password, name, username, profileImageUrl) 
    VALUES (NULL, ?, ?, ?, ?, ?);`,
    [email, passwordHash, name, username, profileImageUrl],
  );

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    id: dbResponse.insertId,
    email,
    name: name,
    username: username,
    profileImageUrl: profileImageUrl,
  };

  return { user: userObject, token: token };
};
