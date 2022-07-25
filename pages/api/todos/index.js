import { TodoList } from "../../../models/TodoList";
import connectDB from "../../../util/mongodb";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import mongoose from "mongoose";
const handler = async (req, res) => {
  const method = req.method;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({
      success: false,
      msg: "Invalide Authentication",
    });
  console.log("session.token.user", session.token.user);
  const userId = mongoose.Types.ObjectId(session.token.user._id || session.token.user.id);
  switch (method) {
    case "POST":
      try {
        const { title, todoItems } = req.body;
        console.log({ title, todoItems, userId });
        const newTodo = await new TodoList({
          title,
          todoItems,
          userId,
          date: new Date().toISOString().slice(0, 10).toString(),
        }).save();
        console.log({ newTodo });
        return res.status(200).json({
          success: true,
          msg: "New Todo Created",
          data: newTodo,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
          type: "duplicated",
        });
      }
    case "GET":
      try {
        const todoList = await TodoList.find({ userId });
        return res.status(200).json({
          success: true,
          data: todoList,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }
    case "DELETE":
      try {
        const id = req.query.id;

        await TodoList.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });
        return res.status(200).json({
          success: true,
          msg: "delete success",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }
    case "PATCH":
      try {
        const { title, todoItems, _id } = req.body;
        console.log({ title, todoItems, _id });
        await TodoList.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, { title, todoItems });

        return res.status(200).json({
          success: true,
          msg: "update success",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: error,
        });
      }
    default:
      break;
  }
};
export default connectDB(handler);
