/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';

import { z } from 'zod';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment).default(Environment.Development),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .string()
    .url()
    .optional()
    .default('postgresql://localhost:5432/redcar'),
  SECRET_PHRASE: z.string().optional().default('default-secret-phrase'),
});

export type EnvVariables = z.infer<typeof envSchema>;

export const validateEnv = () => {
  try {
    const env = envSchema.parse(process.env);
    return env;
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw new Error('Invalid environment configuration');
  }
};
