import express from 'express';
import {
  createComment,
  getCommentByIdImage,
} from '../controllers/comments.controller.js';
export const commentRouter = express.Router();

commentRouter.post('/', createComment);
commentRouter.get('/:id', getCommentByIdImage);
