"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClerkLogin = exports.login = exports.register = void 0;
// src/services/authService.ts
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Certifique-se de que o pacote está instalado
const clerkConfig_1 = __importDefault(require("../clerkConfig"));
const prisma = new client_1.PrismaClient();
const register = async (name, email, password) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email já está em uso');
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 8);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });
    // Adicionar o usuário ao Clerk
    await clerkConfig_1.default.users.createUser({
        emailAddress: email,
        password,
    });
    return user;
};
exports.register = register;
const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        throw new Error('Credenciais inválidas');
    }
    // Gerar o token JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
    return { user, token };
};
exports.login = login;
const handleClerkLogin = async (clerkUserId) => {
    // Implementar a lógica para buscar o usuário no Clerk e no Prisma
    const clerkUser = await clerkConfig_1.default.users.getUser(clerkUserId);
    if (!clerkUser) {
        throw new Error('Usuário não encontrado no Clerk');
    }
    // Buscar o usuário no banco de dados usando o email do Clerk
    const user = await prisma.user.findUnique({ where: { email: clerkUser.emailAddress } });
    if (!user) {
        throw new Error('Usuário não encontrado no banco de dados');
    }
    return user;
};
exports.handleClerkLogin = handleClerkLogin;
