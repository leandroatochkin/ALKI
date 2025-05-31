import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request, NextFunction } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from "api/middleware/checkToken"
import { Payment } from 'api/interfaces/payments';
import { TenantDTO } from 'api/interfaces/tenants';
import { ValidationError } from 'api/error_handling/errorModels';


const router = express.Router();

router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
    const db = getDb();

    const { tenantId } = req.query

    if(!tenantId) {
        return next(new ValidationError('Server error', 'tenantId is required'));
    }
  
    try {
      const [tenants]: [TenantDTO[], any] = await db.query(
        `SELECT * FROM tenants WHERE tenantId = ?`,
        [tenantId]
      ) as [TenantDTO[], any];

      if (!Array.isArray(tenants) || tenants.length === 0) {
        res.status(200).json({ tenants: [] })
        return 
      }
  

      res.status(200).json({ tenants: tenants })
  
    } catch (error) {
        return next(new ServerError('Server error', error));
    }
  })
  
  export default router