import Jwt from "jsonwebtoken";
import UserModel from "../models/Users.model.js";

const authentication = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).send({ message: "Unauthorize User" });
  }

  const token = authorizationHeader.split(" ")[1]; 
  
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decode = Jwt.verify(token, process.env.Refresh_JWT_Secret);
    
    const user = await UserModel.findOne({ email: decode.email }); 
    console.log(user, "<========="); 
    if (!user) {
      return res.status(404).json({ message: "User not Found", status: "failed" });
    }
    req.user = user; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

export { authentication };
