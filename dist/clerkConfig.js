"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/clerkConfig.ts
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const clerk = (0, clerk_sdk_node_1.Clerk)({
    apiKey: process.env.CLERK_API_KEY,
});
exports.default = clerk;
