import jwt from 'jsonwebtoken';
import { configEnv } from '../configs/index.js';
import HTTP_STATUS_CODE from '../utils/httpStatusCode.js';

export const createAccesToken = (data) => {
  return jwt.sign({ data }, configEnv.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, configEnv.SECRET_KEY);
  } catch (error) {
    return false;
  }
};

export const middlewareToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let checkToken = verifyToken(token);
  if (checkToken) {
    // nếu token hợp lệ => pass => qua router
    req.userId = checkToken?.data;
    next();
  } else {
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }
};
