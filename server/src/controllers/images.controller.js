import HTTP_STATUS_CODE from '../utils/httpStatusCode.js';
import { PrismaClient } from '@prisma/client';
import { catchRes } from '../utils/catchRes.js';
import { ErrorCustom } from '../utils/ErrorCustom.js';

const prisma = new PrismaClient();

const getALl = async (req, res) => {
  const { name = '' } = req.query;

  try {
    const result = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: name,
        },
      },
    });
    return res.status(HTTP_STATUS_CODE.OK).json({ result });
  } catch (error) {
    catchRes(error, res);
  }
};

const createIamges = async (req, res) => {
  try {
    let file = req.file;
    const nguoi_dung_id = req.userId;

    const newImage = {
      ten_hinh: file?.originalname,
      duong_dan: file?.path,
      nguoi_dung_id,
    };
    await prisma.hinh_anh.create({ data: newImage });
    return res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: 'Photo upload successful.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const getDetailImageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Id is wrong.',
      });
    }
    const imageItem = await prisma.hinh_anh.findFirst({
      where: { hinh_id: +id },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            email: true,
            ho_ten: true,
            anh_dai_dien: true,
            tuoi: true,
          },
        },
        nguoi_dung_id: false,
      },
    });

    if (!imageItem) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Image not found.',
      });
    }

    return res.status(HTTP_STATUS_CODE.OK).json({
      data: imageItem,
      message: `Get image with id: ${id} successfully`,
    });
  } catch (error) {
    catchRes(error, res);
  }
};

const getListImagesSaveByUserId = async (req, res) => {
  try {
    const id = req.userId;
    const data = await prisma.luu_anh.findMany({
      where: { nguoi_dung_id: +id },
      include: {
        hinh_anh: {
          select: {
            hinh_id: true,
            ten_hinh: true,
            duong_dan: true,
            mo_ta: true,
          },
        },
        hinh_id: false,
      },
    });

    return res.status(HTTP_STATUS_CODE.OK).json({ data, message: 'Success.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const saveImage = async (req, res) => {
  try {
    const hinhId = req.body.hinhId;
    const userId = req.userId;
    if (!hinhId) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'hinhId not found.',
      });
    }
    await prisma.luu_anh.create({
      data: { hinh_id: +hinhId, nguoi_dung_id: +userId },
    });
    return res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: 'Save image successfully.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const getListImageCreateUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: +userId },
    });
    return res.status(HTTP_STATUS_CODE.OK).json({ meesage: 'Success.', data });
  } catch (error) {
    catchRes(error, res);
  }
};

const deleteImageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Id not found.',
      });
    }
    await prisma.luu_anh.deleteMany({
      where: {
        hinh_id: +id,
      },
    });
    await prisma.binh_luan.deleteMany({
      where: {
        hinh_id: +id,
      },
    });
    await prisma.hinh_anh.delete({
      where: {
        hinh_id: +id,
      },
    });
    return res
      .status(HTTP_STATUS_CODE.OK)
      .json({ message: 'Delete successfully.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const getImageSaved = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    if (!id) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Id not found.',
      });
    }
    // check image có trong db không
    const image = await prisma.hinh_anh.findFirst({ where: { hinh_id: +id } });
    if (!image) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'Image not found.',
      });
    }
    const data = await prisma.luu_anh.findFirst({
      where: { hinh_id: +id, nguoi_dung_id: +userId },
    });

    return res
      .status(HTTP_STATUS_CODE.OK)
      .json({ saved: !!data, message: 'Success.' });
  } catch (error) {
    catchRes(error, res);
  }
};

export {
  getALl,
  createIamges,
  getDetailImageById,
  getListImagesSaveByUserId,
  saveImage,
  getListImageCreateUserId,
  deleteImageById,
  getImageSaved,
};
