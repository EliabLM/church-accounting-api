import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('all users');
});

router.get('/:id', (req, res) => {
  res.send('one user');
});

export default router;
