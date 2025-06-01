import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  MONGODB_URI: z.string(),
  OPENAI_API_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

const env = envSchema.parse(process.env);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongodbUri: env.MONGODB_URI,
  openaiApiKey: env.OPENAI_API_KEY,
  clerkSecretKey: env.CLERK_SECRET_KEY,
  frontendUrl: env.FRONTEND_URL,
} as const; 