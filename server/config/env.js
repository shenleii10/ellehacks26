import dotenv from 'dotenv';

export function loadEnv() {
  dotenv.config();

  if (!process.env.PORT) {
    console.warn('PORT not set, using default');
  }
}
