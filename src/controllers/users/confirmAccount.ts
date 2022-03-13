import { Request, Response } from '../../modules';
import User from '../../models/User';

const confirmAccount = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const confirmedUser = await User.findOne({ token });

    if (!confirmedUser) {
      const error = new Error('Token no válido');
      return res.status(403).json({ msg: error.message });
    }

    confirmedUser.confirmed = true;
    confirmedUser.token = '';

    await confirmedUser.save();

    res.json({ msg: 'Usuario confirmado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default confirmAccount;
