// src/services/authService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Certifique-se de que o pacote está instalado
import clerkClient from '../clerkConfig';
import zxcvbn from 'zxcvbn';

const prisma = new PrismaClient();

export const register = async (name: string, email: string, password: string) => {
  console.log(`Registrando usuário: ${email}`);
  
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    console.error('Senha não segura');
    throw new Error('A senha não é suficientemente segura.');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.error('Email já está em uso');
    throw new Error('Email já está em uso');
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  console.log('Usuário criado no Prisma', user);

  // Adicionar o usuário ao Clerk
  const newUser = await clerkClient.users.createUser({
    emailAddress: [email],
    password,
  });

  return newUser.id;
};


export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
  return { user, token };
};

export const handleClerkLogin = async (clerkUserId: string) => {
  console.log(`Clerk User ID: ${clerkUserId}`); // Adicione um log para verificar o ID
  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  console.log('Clerk User:', clerkUser); // Adicione um log para verificar a resposta

  if (!clerkUser) {
    throw new Error('Usuário não encontrado no Clerk');
  }

  const email = clerkUser.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    throw new Error('Email do usuário não encontrado');
  }

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Criar novo usuário se não existir
    user = await prisma.user.create({
      data: {
        email,
        name: clerkUser.firstName || '',
        profileImage: clerkUser.imageUrl || '', // Adicionar a URL da imagem de perfil
        password: 'Mudar123', // Defina uma senha padrão segura ou gere uma nova
      },
    });
  } else {
    // Atualizar informações do usuário se já existir
    user = await prisma.user.update({
      where: { email },
      data: {
        name: clerkUser.firstName || '',
        profileImage: clerkUser.imageUrl || '', // Atualizar a URL da imagem de perfil
      },
    });
  }

  return user;
};

