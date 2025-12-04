import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const status = err.status || "error"

  res.status(statusCode).json({
    status,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
