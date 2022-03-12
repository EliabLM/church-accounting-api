import { Request, Response, bcrypt } from '../../modules';
import User from '../../models/User';
import generateJWT from '../../helpers/generateJWT';

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

export default authenticate;
