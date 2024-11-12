import { catchRes } from '../utils/catchRes.js';
import { ErrorCustom } from '../utils/ErrorCustom.js';
import HTTP_STATUS_CODE from '../utils/httpStatusCode.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createComment = async (req, res) => {
  try {
    const { noiDung, hinhId } = req.body;
    const userId = req.userId;

    if (!noiDung) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'noiDung not empty.',
      });
    }

    if (!hinhId) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.BAD_REQUEST,
        message: 'hinhId not empty.',
      });
    }
    const newComment = {
      nguoi_dung_id: +userId,
      hinh_id: +hinhId,
      noi_dung: noiDung,
    };
    await prisma.binh_luan.create({ data: newComment });
    return res
      .status(HTTP_STATUS_CODE.CREATED)
      .json({ message: 'Comment successfully.' });
  } catch (error) {
    catchRes(error, res);
  }
};

const getCommentByIdImage = async (req, res) => {
  try {
    const { id } = req?.params;
    if (!id) {
      throw new Error('Id not found.');
    }
    const data = await prisma.binh_luan.findFirst({
      where: {
        hinh_id: +id,
      },
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
        hinh_anh: {
          select: {
            hinh_id: true,
            ten_hinh: true,
            duong_dan: true,
            mo_ta: true,
          },
        },
        nguoi_dung_id: false,
        hinh_id: false,
      },
    });
    if (!data) {
      ErrorCustom({
        code: HTTP_STATUS_CODE.NOT_FOUND,
        message: 'No comments found with image id.',
      });
    }
    return res.status(HTTP_STATUS_CODE.OK).json({ data, message: 'Success.' });
  } catch (error) {
    catchRes(error, res);
  }
};

export { createComment, getCommentByIdImage };
