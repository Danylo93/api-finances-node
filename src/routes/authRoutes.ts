// src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login, clerkLogin } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/clerk-login', clerkLogin);

export default router;
