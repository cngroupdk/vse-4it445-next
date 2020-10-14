import { createToken } from '../../libs/token';

export const signin = async () => {
  const token = createToken({ id: 'mockedUserId' });

  return {
    token,
  };
};
