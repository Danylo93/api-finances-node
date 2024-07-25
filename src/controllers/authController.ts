import { Request, Response } from 'express';
import { register as registerService, login as loginService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerService(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginService(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
