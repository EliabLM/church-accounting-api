import { jwt } from '../modules';

const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET || '', {
    expiresIn: '3600',
  });
};

export default generateJWT;
