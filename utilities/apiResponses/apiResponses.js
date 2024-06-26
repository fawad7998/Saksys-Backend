const useSuccessResponse = (res, message, data, statusCode) => {
  return res.status(statusCode).json({
    message,
    success: true,
    statusCode,
    data,
  });
};

const useErrorResponse = (res, message, statusCode) => {
  return res.status(statusCode).json({
    message,
    success: false,
    statusCode,
  });
};

module.exports = {
  useSuccessResponse,
  useErrorResponse,
};
