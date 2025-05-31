import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request, NextFunction } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';


const router = express.Router();

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next: NextFunction) => {

  const db = getDb()

  const { organizationId, name, description } = req.body;

  if (!organizationId || !name || !description) {
    return next(new ValidationError('organizationId, name, and description are required', ''));
  }

  try {

      // Insert new user
      await db.query(
        `UPDATE organizations 
         SET name = ?, description = ?
         WHERE organizationId = ?`,
        [
            name,
            description,
            organizationId,
        ]
      );
      
      res.status(201).json({ message: 'organization updated successfully' });
      return;
      
    } catch (err) {
      console.error('Error updating organizarion', err);
      return next(new ServerError('Server error', err));
    }
});

export default router;