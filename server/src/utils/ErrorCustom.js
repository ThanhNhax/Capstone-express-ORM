import HTTP_STATUS_CODE from './httpStatusCode.js';

export const ErrorCustom = ({
  code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  message = 'Internal Server Error',
}) => {
  const error = new Error(message);
  error.status = code;
  throw error;
};
