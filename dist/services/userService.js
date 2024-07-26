"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
// src/services/userService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};
exports.getUserById = getUserById;
const updateUser = async (id, updates) => {
    return prisma.user.update({
        where: { id },
        data: updates,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return prisma.user.delete({
        where: { id },
    });
};
exports.deleteUser = deleteUser;
const listUsers = async () => {
    return prisma.user.findMany();
};
exports.listUsers = listUsers;
