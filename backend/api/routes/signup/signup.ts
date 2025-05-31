import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { getDb } from 'api/db/db';
import { ValidationError, ServerError } from 'api/error_handling/errorModels';
import { 
  emailRegex, 
} from 'api/helpers/regexPatterns';
import { RowDataPacket } from 'mysql2';


const domain = process.env.AUTH0_DOMAIN
const audience = process.env.AUTH0_AUDIENCE


const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});



const router = express.Router();

import { Request } from 'express';

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {
  try {

    const db = getDb();
    const { id, email } = req.body;

    // Validate email format
    if (!emailRegex.test(email)) {
      return next(new ValidationError('Invalid email format.', ''));
    }
    
    // Check if email exists (using promise-based pool)
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      const rows = existingUsers as RowDataPacket[];
      const isNew = rows[0]?.is_new === 1;
      
      res.status(200).json({ isNewUser: isNew === true });
      return;
    }
    
    
    // Insert new user
    await db.query(
      `INSERT INTO users(id, email, is_new) VALUES(?,?,?)`,
      [id, email, true]
    );
    
    res.status(201).json({ message: 'User created successfully', isNewUser: true });
    return;
    
  } catch (err) {
    console.error('User init error:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;
