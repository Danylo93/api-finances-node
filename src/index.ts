// src/index.ts

import { PrismaClient } from '@prisma/client';
import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';


const prisma = new PrismaClient();
const app = express();

app.use(express.json());


app.use('/api/auth', authRoutes);
// Rotas de usuário
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
