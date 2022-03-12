import { Request, Response } from '../../modules';

const read = (req: Request, res: Response) => {
  res.json({ msg: 'Leyendo usuarios' });
};

const readById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ msg: 'Leyendo usuario por id', id });
};

export default read;
export { readById };
