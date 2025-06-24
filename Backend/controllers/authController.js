import  User  from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
const SECRET = process.env.JWT_SECRET

const createAccount = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const isUser = await User.findOne({where:{ email}});
    if(isUser){
        return res.status(400).json({ error: 'Email already exists' });
    }
    const user = await User.create({ name, email, password: hash });
    return res.status(201).json({ message: 'User created',user });
  } catch (e) {
    console.log(error)
      return res.status(500).json({error:"Internal server problem"})
    }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: 'Invalid credentials' });
      
      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
      return res.json({ token, user: { id: user.id, name: user.name } });
    } catch (error) {
      return res.status(500).json({error:"Internal server problem"})
    
  }
}

export {createAccount,login}