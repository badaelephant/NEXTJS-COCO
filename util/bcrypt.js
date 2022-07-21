import bcryptjs from "bcryptjs";

const saltRounds = 10;
const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(saltRounds);
  console.log("salt", salt);
  const hash = await bcryptjs.hash(password, salt);
  console.log("hash", hash);
  return hash;
};

const comparePassword = async (input_password, hashed_password) => {
  const isMatch = await bcryptjs.compare(input_password, hashed_password);
  return isMatch;
};
const bcrypt = { hashPassword, comparePassword };

export default bcrypt;
