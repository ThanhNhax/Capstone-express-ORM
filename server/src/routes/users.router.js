import express from 'express';
import {
  getUser,
  getUserById,
  udpateUser,
  udpateAvatarUser,
} from '../controllers/users.controller.js';
import { middlewareToken } from '../middleware/token.js';
import { uploadCloud } from '../configs/cloudinary.js';

export const userRoutes = express.Router();

userRoutes.get('/detail', getUserById);
userRoutes.get('/', getUser);
userRoutes.put('/update', udpateUser);
userRoutes.post('/update-avatar', uploadCloud, udpateAvatarUser);
