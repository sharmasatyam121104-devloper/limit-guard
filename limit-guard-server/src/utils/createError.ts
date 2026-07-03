interface AppError extends Error {
  statusCode: number;
}

const createError = (statusCode: number, message: string): AppError => {
  const error = new Error(message) as AppError;

  error.statusCode = statusCode;

  Error.captureStackTrace(error, createError);

  return error;
};

export default createError;