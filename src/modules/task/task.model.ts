import mongoose, { Schema, Document }from "mongoose";

export interface ITask extends Document {
  user: mongoose.Types.ObjectId
  title: string
  status: "todo" | "in-progress" | "completed" | "overdue"
  dueDate: Date
  attachment?: string | null
  createdAt: Date
  updatedAt: Date
}

const taskSchema = new Schema<ITask>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ["todo", "in-progress", "completed", "overdue"], default: "todo" },
    dueDate: { type: Date, required: true }, attachment: { type: String, default: null }
  },

  { timestamps: true }
)

export const Task = mongoose.model<ITask>("Task", taskSchema)
