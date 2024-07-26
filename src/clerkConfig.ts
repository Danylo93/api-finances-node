// src/clerkConfig.ts
import { createClerkClient } from '@clerk/clerk-sdk-node';

// Utilize a chave secreta adequada, que pode ser configurada através de variáveis de ambiente
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_API_KEY!,
});

export default clerkClient;
