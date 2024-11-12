import bcrypt from 'bcrypt';
import { configEnv } from '../configs/index.js';
import { createAccesToken } from '../middleware/token.js';
import HTTP_STATUS_CODE from '../utils/httpStatusCode.js';
import { PrismaClient } from '@prisma/client';
import { ErrorCustom } from '../utils/ErrorCustom.js';
import { catchRes } from '../utils/catchRes.js';
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password } = req?.body;

  // Gọi hàm xác thực
  if (!validateEmail(email)) {
    ErrorCustom({
      code: HTTP_STATUS_CODE.BAD_REQUEST,
      message: 'Invalia email address.',
    });
  }

  if (!validatePassword(password)) {
    ErrorCustom({
      code: HTTP_STATUS_CODE.BAD_REQUEST,
      message: 'Password must be at least 6 characters long.',
    });
  }

  try {
    // check email có tồn tại chưa
    const user = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.CONFLICT,
        message: 'Email already exists.',
      });
    }

    // Mã hóa mật khẩu
    const encrypted = await bcrypt.hash(password, +configEnv.SALT_ROUNDS);

    // Tạo người dùng mới
    await prisma.nguoi_dung.create({
      data: {
        email,
        mat_khau: encrypted,
      },
    });

    return res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: 'You have successfully registered.' });
  } catch (error) {
    catchRes(error, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req?.body;
   
    // Gọi hàm xác thực
    if (!validateEmail(email)) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Invalia email address.',
      });
    }

    if (!validatePassword(password)) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Password must be at least 6 characters long.',
      });
    }
    const user = await prisma.nguoi_dung.findFirst({ where: { email } });
    if (!user) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Email not found.',
      });
    }

    const checkPassword = bcrypt.compare(password, user.mat_khau);
    if (!checkPassword) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Password not correct.',
      });
    }

    //tao accessToken
    const accessToken = createAccesToken(user?.nguoi_dung_id);
    return res
      .status(HTTP_STATUS_CODE.OK)
      .json({ accessToken, message: 'Login successful.' });
  } catch (error) {
    catchRes(error, res);
  }
};

// Hàm xác thực email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Hàm xác thực mật khẩu
const validatePassword = (password) => {
  return password.length >= 6; // Bạn có thể thêm các quy tắc phức tạp hơn ở đây
};
export { register };
