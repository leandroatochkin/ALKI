import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request, NextFunction } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

const router = express.Router();

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next: NextFunction) => {
  const  services  = req.body;

  if (!services) {
    return next(new ValidationError('members are required', error));
  }

  try {

      const serviceId = uuidv4()
  
     for(const service in services){
        await db.query(
          `INSERT INTO services(
            serviceId,
            propertyId,
            serviceName,
            serviceCost,
            serviceResponsibility,
            serviceDescription)
            VALUES(?,?,?,?,?,?)`,
            [
                serviceId,
                services[service].propertyId,
                services[service].serviceName,
                services[service].serviceCost,
                services[service].serviceResponsibility,
                services[service].serviceDescription,
            ])
     }
      
      res.status(201).json({ message: 'services added successfully' });
      return;
      
    } catch (err) {
      console.error('Error adding services', err);
      return next(new ServerError('Server error', err));
    }
});

export default router;
