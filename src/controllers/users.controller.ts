import { Request, Response } from 'express';
import User from '../models/User';

const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = new Error('Usuario ya registrado');

    return res.status(400).json({ message: error.message });
  }

  try {
    const user = new User(req.body);

    const storedUser = await user.save();

    res.json({ msg: 'Usuario creado', user: storedUser });
  } catch (error) {
    res.json({ msg: 'Error', error });
  }
};

const readUsers = (req: Request, res: Response) => {
  res.json({ msg: 'Leyendo usuarios' });
};

export { createUser, readUsers };
