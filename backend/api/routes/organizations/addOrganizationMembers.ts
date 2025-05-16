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
  const { members } = req.body;

  if ( !members) {
    return next(new ValidationError('members are required', ''));
  }

  try {

      const memberId = uuidv4()
  
     for(const member in members){
        await db.query(
          `INSERT INTO organization_members(
            memberId,
            organizationId,
            creatorId,
            name,
            email,
            permissions)
            VALUES(?,?,?,?,?,?)`,
            [
                memberId,
                members[member].organizationId,
                members[member].creatorId,
                members[member].name,
                members[member].email,
                members[member].permissions,
            ])
     }
      
      res.status(201).json({ message: 'organization successfully' });
      return;
      
    } catch (err) {
      console.error('Error creating organizarion', err);
      return next(new ServerError('Server error', err));
    }
});

export default router;
