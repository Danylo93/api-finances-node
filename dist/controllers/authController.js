"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkLogin = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/authService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Certifique-se de que o pacote está instalado
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await authService.register(name, email, password);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await authService.login(email, password);
        res.json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
};
exports.login = login;
const clerkLogin = async (req, res) => {
    const { clerkUserId } = req.body;
    try {
        const user = await authService.handleClerkLogin(clerkUserId);
        // Gerar um token JWT para o usuário, se necessário
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
        res.json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
};
exports.clerkLogin = clerkLogin;
