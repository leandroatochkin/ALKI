import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';

const router = express.Router();

router.put('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {


  const db = getDb()

    try {
      const {
        userId, 
        id,
        title,
        description,
        address,
        city,
        state,
        country,
        occupied,
        type
      } = req.body;
  
      await db.query(
        `UPDATE properties 
         SET title = ?, description = ?, address = ?, city = ?, 
             state = ?, country = ?, occupied = ?, type = ? 
         WHERE propId = ?`,
        [
          title,
          description,
          address,
          city,
          state,
          country,
          occupied,
          type,
          id
        ]
      );
  
      res.status(200).json({ message: 'property updated successfully' });
    } catch (err) {
      console.error('property error:', err);
      return next(new ServerError('Server error', err));
    }
  });
  

export default router;