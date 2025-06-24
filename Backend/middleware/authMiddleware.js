import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    try {
        if (token && token.startsWith("Bearer")){
            const data = jwt.verify(token.split(' ')[1], SECRET);
            if(!data) return res.status(401).json({ error: 'Invalid token' });
            req.userId = data.id;
            next();
            
        }
        else{
            return res.status(401).json({ error: 'Unauthorized' });

        }
    } catch {
      return res.status(500).json({message:"Internal server problem"})
        
    }
};
