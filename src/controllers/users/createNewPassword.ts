import User from '../../models/User';
import { bcrypt, Request, Response } from '../../modules';

const createNewPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ token });

    if (user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.token = '';

      await user.save();

      res.json({ msg: 'Password actualizado correctamente' });
    } else {
      const error = new Error('Token no válido');
      res.status(404).json({ msg: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default createNewPassword;
