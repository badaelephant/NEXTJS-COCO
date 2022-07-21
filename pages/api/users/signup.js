import { User } from "../../../models/Users";
import bcrypt from "../../../util/bcrypt";
import connectDB from "../../../util/mongodb";

const handler = async (req, res) => {
  console.log("handler");
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const { nickName, email, password } = req.body;

        const hashPassword = await bcrypt.hashPassword(password);
        const newUser = new User({ nickName, email, password: hashPassword });
        const createdUser = await newUser.save();

        return res.status(200).json({
          success: true,
          msg: "New User Created",
          data: createdUser,
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
