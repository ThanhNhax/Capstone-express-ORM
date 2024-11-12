import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { configEnv } from './index.js';

// Cấu hình dotenv để sử dụng các biến môi trường
dotenv.config();

// cấu hình cloudianry
cloudinary.config({
  cloud_name: configEnv.CLOUDIARY_NAME,
  api_key: configEnv.CLOUDIARY_API_KEY,
  api_secret: configEnv.CLOUDIARY_API_SECRET,
});

// cấu hình bộ lưu trữ cho Multer với cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => {
      const validFormats = ['jpeg', 'png', 'gif', 'webp']; // Các định dạng cho phép
      const fileFormat = file.mimetype.split('/')[1]; // Lấy phần định dạng từ mimetype
      // Kiểm tra xem định dạng của file có trong danh sách hợp lệ hay không
      if (validFormats.includes(fileFormat)) {
        return fileFormat;
      }

      // Nếu không hợp lệ, trả về định dạng mặc định (ví dụ 'png')
      return 'png';
    },
    public_id: (req, file) => file.originalname.slice('.')[0],
  },
});



// Khởi tạo Multer với Cloudinary storage
export const uploadCloud = multer({ storage }).single('hinhAnh');
