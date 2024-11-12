import express from 'express';
import { userRoutes } from './users.router.js';
import { authRouter } from './auth.router.js';
import { imagesRouter } from './images.router.js';
import { commentRouter } from './comment.router.js';
import { middlewareToken } from '../middleware/token.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', middlewareToken, userRoutes);
rootRouter.use('/images', middlewareToken, imagesRouter);
rootRouter.use('/comment', middlewareToken, commentRouter);

export default rootRouter;
