import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (name: string, email: string, password: string) => {
  // Verificar se o email já está registrado
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email já está em uso');
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }
  
  // Gerar o token JWT
  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
  return { user, token };
};
