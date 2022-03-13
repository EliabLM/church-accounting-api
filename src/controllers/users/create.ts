import { Request, Response, bcrypt } from '../../modules';
import User from '../../models/User';
import generateId from '../../helpers/generateId';

const create = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      const error = new Error('Usuario ya registrado');

      return res.status(400).json({ message: error.message });
    }

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
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default create;
