import dotenv from 'dotenv';

export function loadEnv() {
  dotenv.config();

  if (!process.env.PORT) {
    console.warn('PORT not set, using default');
  }

  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not set - ingredient explanations will be unavailable');
  }
}