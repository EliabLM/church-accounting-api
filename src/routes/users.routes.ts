import { Router } from '../modules';
import {
  create,
  read,
  readById,
  confirmAccount,
  update,
  deleteUser,
  authenticate,
  recoverPassword,
} from '../controllers/users';

const router = Router();

router.post('/', create);
router.get('/', read);
router.get('/:id', readById);
router.put('/:id', update);
router.delete('/:id', deleteUser);
router.post('/login', authenticate);
router.get('/confirm-account/:token', confirmAccount);
router.post('/recover-password', recoverPassword);

export default router;
