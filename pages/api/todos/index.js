import { getSession } from "next-auth/react";
import { TodoList } from "../../../models/TodoList";
import connectDB from "../../../util/mongodb";

const handler = async (req, res) => {
  const method = req.method;
  const session = await getSession();
  console.log(session);
  //   switch (method) {
  //     case "POST":
  //       try {

  //         const { title, todoItems } = req.body;
  //         const hashPassword = await bcrypt.hashPassword(password);
  //         const newUser = new User({ nickName, email, password: hashPassword });
  //         const createdUser = await newUser.save();
  //         return res.status(200).json({
  //           success: true,
  //           msg: "New User Created",
  //           data: createdUser,
  //         });
  //       } catch (error) {
  //         return res.status(500).json({
  //           success: false,
  //           msg: error,
  //         });
  //       }

  //     default:
  //       break;
  //   }
};
export default connectDB(handler);
