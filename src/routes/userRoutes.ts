import { Router } from 'express';
import { updateUser, deleteUser, getUser, listUsers } from '../controllers/userController';

const router = Router();

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.get('/users/:id', getUser);

router.get('/users', listUsers);

export default router;
 