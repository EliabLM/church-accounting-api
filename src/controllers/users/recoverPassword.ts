import User from '../../models/User';
import { Request, Response } from '../../modules';
import generateId from '../../helpers/generateId';

const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      const error = new Error('El usuario no existe');
      return res.status(404).json({ message: error.message });
    }

    existUser.token = generateId();
    await existUser.save();

    res.json({
      msg: 'Hemos enviado un email con las instrucciones de recuperación',
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default recoverPassword;
