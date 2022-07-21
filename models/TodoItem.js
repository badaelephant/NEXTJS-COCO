import mongoose, { Schema } from "mongoose";

const todoItemSchema = new mongoose.Schema({
  todoId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const TodoItem =
  mongoose.models.TodoItem || mongoose.model("TodoItem", todoItemSchema);
