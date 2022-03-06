import { Router } from 'express';
import { createUser, readUsers } from '../controllers/users.controller';

const router = Router();

router.post('/', createUser);

router.get('/', readUsers);

router.get('/:id', (req, res) => {
  res.send('one user');
});

export default router;
