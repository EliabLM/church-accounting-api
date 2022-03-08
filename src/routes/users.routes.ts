import { Router } from 'express';
import {
  authenticate,
  createUser,
  deleteUser,
  readUser,
  readUsers,
  updateUser,
} from '../controllers/users.controller';

const router = Router();

router.post('/', createUser);
router.get('/', readUsers);
router.get('/:id', readUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', authenticate);
router.get('/confirm/:token', () => {
  console.log('confirmando usuario');
});

export default router;
