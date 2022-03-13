import User from '../../models/User';
import { Request, Response } from '../../modules';

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    res.json({
      msg: 'Usuario eliminado',
      user: { id: deletedUser._id, email: deletedUser.email },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default deleteUser;
