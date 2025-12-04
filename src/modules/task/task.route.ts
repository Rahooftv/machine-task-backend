import express from "express";
import { taskController } from "./task.controller";
import { upload } from "../../middleware/upload.middleware";

const router = express.Router()


router.post("/add", upload.single("attachment"), taskController.createTask)
router.get("/", taskController.getTasks)
router.put("/:id", upload.single("attachment"), taskController.updateTask)
router.delete("/:id", taskController.deleteTask);

export default router
