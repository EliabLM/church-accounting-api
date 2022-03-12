import { Request, Response } from '../../modules';

const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: 'Eliminando usuario', id });
};

export default deleteUser;
