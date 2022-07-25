import mongoose, { Schema } from "mongoose";

const todoListSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  todoItems: {
    type: Array,
    default: [],
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const TodoList = mongoose.models.TodoList || mongoose.model("TodoList", todoListSchema);
