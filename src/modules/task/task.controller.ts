import { Request, Response, NextFunction } from "express";
import { taskService } from "./task.service";

export const taskController = {

  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filePath = req.file ? `/uploads/${req.file.filename}` :undefined
      const task = await taskService.createTask(
        (req as any).userId,
        req.body,
        filePath
      );

      res.status(201).json({ message: "Task created", task })
    } catch (err) {
      next(err)
    }
  },

  getTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await taskService.getTasks((req as any).userId)
      res.json({tasks})
    } catch (err) {
      next(err)
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filePath = req.file ? `/uploads/${req.file.filename}` :undefined
      const task = await taskService.updateTask(
        req.params.id,
        (req as any).userId,
        req.body,
        filePath
      );

      res.json({ message: "Task updated", task })
    } catch (err) {
      next(err)
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await taskService.deleteTask(req.params.id, (req as any).userId)
      res.json({ message: "Task deleted" })
    } catch (err) {
      next(err)
    }
  },
};
