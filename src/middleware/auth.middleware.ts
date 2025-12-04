import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = {
  protect: (req:Request, res:Response, next:NextFunction) => {

    try {
      const token = req.cookies?.token

      if (!token)
        return res.status(401).json({ message: "Not authorized, No token" })

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string
    }

      (req as any).userId = decoded.id
        next()

    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" })
    }
  },
};
