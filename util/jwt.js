import jsonwebtoken from "jsonwebtoken";

const createToken = (email) => {
  const token = jsonwebtoken.sign({ email }, process.env.SECRET, {
    expiresIn: "10d",
  });
  return token;
};

const jwt = { createToken };

export default jwt;
