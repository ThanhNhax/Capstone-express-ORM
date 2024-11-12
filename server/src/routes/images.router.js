import express from 'express';
import {
  createIamges,
  deleteImageById,
  getALl,
  getDetailImageById,
  getListImageCreateUserId,
  getListImagesSaveByUserId,
  saveImage,
  getImageSaved,
} from '../controllers/images.controller.js';
import { uploadCloud } from '../configs/cloudinary.js';
import { middlewareToken } from '../middleware/token.js';

export const imagesRouter = express.Router();

imagesRouter.get('/user-save', getListImagesSaveByUserId);
imagesRouter.get('/user-create', getListImageCreateUserId);
imagesRouter.get('/detail/:id/saved', getImageSaved);
imagesRouter.get('/detail/:id', getDetailImageById);
imagesRouter.get('/', getALl);
imagesRouter.post('/', uploadCloud, createIamges);
imagesRouter.post('/save', saveImage);
imagesRouter.delete('/:id', deleteImageById);
