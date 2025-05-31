import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { v4 as uuidv4 } from 'uuid';
import { checkJwt } from 'api/middleware/checkToken';

const router = express.Router();

router.post('/', checkJwt,async (req: Request & AuthResponse, res: Response, next) => {

  const db = getDb()

  try {
    const { 
            userId,
            title,
            description,
            address,
            city,
            state,
            country,
            occupied,
            type,
     } = req.body;

    
    const propId = uuidv4()
    // Insert new user
    await db.query(
      `INSERT INTO properties(propId, userId, title, description, address, city, state, country, occupied, type) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        propId,
        userId,
        title,
        description,
        address,
        city,
        state,
        country,
        occupied,
        type
      ]
    );
    
    res.status(201).json({ message: 'property created successfully' });
    return;
    
  } catch (err) {
    console.error('User init error:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;