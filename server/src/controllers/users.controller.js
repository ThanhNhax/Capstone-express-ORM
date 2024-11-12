import { PrismaClient } from '@prisma/client';
import HTTP_STATUS_CODE from '../utils/httpStatusCode.js';
import { ErrorCustom } from '../utils/ErrorCustom.js';
import { catchRes } from '../utils/catchRes.js';
const prisma = new PrismaClient();
const getUser = async (req, res) => {
  try {
    const data = await prisma.nguoi_dung.findMany();
    return res.status(HTTP_STATUS_CODE.OK).json({ data });
  } catch (error) {
    catchRes(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.userId;
   
    const data = await prisma.nguoi_dung.findFirst({
      where: { nguoi_dung_id: +id },
      select: {
        nguoi_dung_id: true,
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true,
        mat_khau: false,
      },
    });
    return res.status(HTTP_STATUS_CODE.OK).json({ data, message: 'Success.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const udpateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = { ...req.body };
    // Lọc ra các trường có giá trị

    await prisma.nguoi_dung.update({
      where: { nguoi_dung_id: userId },
      data: {
        ho_ten: userData.hoTen,
        tuoi: parseInt(userData.tuoi),
        anh_dai_dien: userData.anhDaiDien,
      },
    });
    return res.status(HTTP_STATUS_CODE.CREATED).json({ message: 'Updated.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const udpateAvatarUser = async (req, res) => {
  try {
    let file = req.file;
    const userId = req.userId;
    if (!file) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'File not found.',
      });
    }

    await prisma.nguoi_dung.update({
      where: { nguoi_dung_id: userId },
      data: { anh_dai_dien: file.path },
    });

    return res
      .status(HTTP_STATUS_CODE.OK)
      .json({ message: 'Update avatar successfully.' });
  } catch (error) {
    catchRes(error, res);
  }
};

export { getUser, getUserById, udpateUser, udpateAvatarUser };
