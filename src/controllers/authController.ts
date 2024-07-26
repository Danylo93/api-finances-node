// src/controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authService';
import jwt from 'jsonwebtoken'; // Certifique-se de que o pacote está instalado

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.register(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const clerkLogin = async (req: Request, res: Response) => {
  const { clerkUserId } = req.body;
  try {
    const user = await authService.handleClerkLogin(clerkUserId);
    // Gerar um token JWT para o usuário, se necessário
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
