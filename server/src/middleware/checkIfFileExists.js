import HTTP_STATUS_CODE from '../utils/httpStatusCode.js';

// Middleware để kiểm tra nếu không có file hình ảnh
export const checkIfFileExists = (req, res, next) => {
  if (!req.file) {
    return res
      .status(HTTP_STATUS_CODE.BAD_GATEWAY)
      .json({ error: 'No image files were uploaded.' });
  }
  next();
};
