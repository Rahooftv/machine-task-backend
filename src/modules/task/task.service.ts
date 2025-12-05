import { Task } from "./task.model";

export const taskService = {

  createTask: async (userId:string, data:any, filePath?:string) => {
    const task = await Task.create({
      user: userId,
      title: data.title,
      dueDate: data.dueDate,
      status: data.status || "todo",
      attachment: filePath || null,
    });

    return task
  },

getTasks: async (userId: string, status?: string, search?: string) => {
  const filter: any = { user: userId }

  if (status && status !== "all") {
    filter.status = status;
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" }
  }

  return await Task.find(filter).sort({ createdAt: -1 })
},


  getTaskById: async (taskId: string, userId: string) => {
  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) throw { statusCode: 404, message: "Task not found" };

  return task;
},


  updateTask: async (taskId: string, userId: string, data: any, filePath?: string) => {
    const updateData: any = {
      title: data.title,
      status: data.status,
      dueDate: data.dueDate,
    };

    if (filePath) updateData.attachment = filePath

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateData,
      { new: true }
    );

    if (!task) throw { statusCode: 404, message: "Task not found" }

    return task
  },

  deleteTask: async (taskId: string, userId: string) => {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId })

    if (!task) throw { statusCode: 404, message: "Task not found" }

    return task
  },
}