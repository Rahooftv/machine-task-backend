import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

export const authController = {
  register: async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const user = await authService.register(name, email, password);

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  },


  login: async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { email, password } = req.body;

      const { user, token } = await authService.login(email, password);

     
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })

      res.json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      next(error)
    }
  },


  logout: async (req: Request, res: Response) => {
    res.clearCookie("token")
    res.json({ message: "Logged out successful" })
  },
}
