import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';
import generateId from '../helpers/generateId';
import generateJWT from '../helpers/generateJWT';

const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = new Error('Usuario ya registrado');

    return res.status(400).json({ message: error.message });
  }

  try {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.token = generateId();

    const storedUser = await user.save();

    res.json({
      msg: 'Usuario creado',
      user: {
        name: storedUser.name,
        email: storedUser.email,
      },
    });
  } catch (error) {
    res.json({ msg: 'Error', error });
  }
};

const readUsers = (req: Request, res: Response) => {
  res.json({ msg: 'Leyendo usuarios' });
};

const readUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: 'Leyendo usuario por id', id });
};

const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: 'Actualizando usuario', id });
};

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: 'Eliminando usuario', id });
};

const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  if (!user.confirmed) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  const isAuth = await bcrypt.compare(password, user.password);
  if (isAuth) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error('Correo o contraseña incorrectos');
    return res.status(403).json({ msg: error.message });
  }
};

export {
  createUser,
  readUsers,
  readUser,
  authenticate,
  updateUser,
  deleteUser,
};
