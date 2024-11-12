import dotenv from 'dotenv';
dotenv.config();

export const configEnv = {
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  SECRET_KEY: process.env.SECRET_KEY,
  CLOUDIARY_NAME: process.env.CLOUDIARY_NAME,
  CLOUDIARY_API_KEY: process.env.CLOUDIARY_API_KEY,
  CLOUDIARY_API_SECRET: process.env.CLOUDIARY_API_SECRET,
};
