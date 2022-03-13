import User from '../../models/User';
import { Request, Response } from '../../modules';

const read = async (req: Request, res: Response) => {
  try {
    let users = await User.find();

    users = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      confirmed: user.confirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    res.json({ users });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

const readById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      confirmed: user.confirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export default read;
export { readById };
