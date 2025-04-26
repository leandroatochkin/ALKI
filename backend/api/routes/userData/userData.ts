import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';



const router = express.Router();


router.get('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {
  try {
    const { id } = req.query;

    // Validate email format

    // Check if email exists (using promise-based pool)
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE id = ?', 
      [id]
    );

    if (Array.isArray(existingUsers) && existingUsers.length === 0) {      
        res.status(201).json({ userInfo: `user not found` });
        return;
      }
      
    

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {      
      res.status(200).json({ userInfo: existingUsers[0] });
      return;
    }
    
    
  } catch (err) {
    console.error('User init error:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;
