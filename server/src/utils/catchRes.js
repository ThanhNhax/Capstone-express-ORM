import HTTP_STATUS_CODE from './httpStatusCode.js';

export const catchRes = (error, res) =>
  res
    .status(error?.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json({ error: error?.message });
