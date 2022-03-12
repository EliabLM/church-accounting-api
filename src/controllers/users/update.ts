import { Request, Response } from '../../modules';

const update = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: 'Actualizando usuario', id });
};

export default update;
