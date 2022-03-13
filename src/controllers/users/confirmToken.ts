import User from '../../models/User';
import { Request, Response } from '../../modules';

const confirmToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const validToken = await User.findOne({ token });

    if (validToken) {
      res.json({ msg: 'Token válido' });
    } else {
      res.status(404).json({ msg: 'Token no válido' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default confirmToken;
