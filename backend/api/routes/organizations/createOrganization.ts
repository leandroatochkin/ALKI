import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request, NextFunction } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next: NextFunction) => {
  const { userId, name, description } = req.body;

  if (!userId || !name || !description) {
    return next(new ValidationError('User ID, name, and description are required', ''));
  }

  try {

      const organizationId = uuidv4()
  
      // Insert new user
      await db.query(
        `INSERT INTO organizations(
          organizationId,
          userId,
          description,
          name
         ) VALUES(?,?,?,?)`,
        [
            organizationId,
            userId,
            description,
            name,
        ]
      );
      
      res.status(201).json({ message: 'organization successfully' });
      return;
      
    } catch (err) {
      console.error('Error creating organizarion', err);
      return next(new ServerError('Server error', err));
    }
});

export default router;
