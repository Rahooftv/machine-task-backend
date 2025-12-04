import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";

export const authService = {

  register: async (name:string, email:string, password:string) => {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw { statusCode: 400, message: "email already exist" }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  },


  login: async (email:string, password:string) => {
    const user = await User.findOne({email })
    if (!user) throw { statusCode: 400, message: "invalid email or password" }

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw { statusCode: 400, message: "Invalid email or password" }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string,{
      expiresIn: "1d",
    })

    return { user, token }
  },

}
