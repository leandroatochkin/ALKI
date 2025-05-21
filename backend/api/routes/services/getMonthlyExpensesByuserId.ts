import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';

const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.query;

    if (!userId) {
        return next(new ValidationError('Server error', 'userId is required'));
    }

  try {
    const [servicesCosts] = await db.query(`SELECT serviceCost FROM services WHERE userId = ? AND serviceResponsibility = 'propietario'`, [userId]) as any[];

    if (!Array.isArray(servicesCosts) || servicesCosts.length === 0) {
      res.status(200).json({ message: 'No services found for this user' })
      return
    }
    
    const total = servicesCosts.reduce((acc, current) => acc + current.serviceCost, 0);

    res.status(200).json({ total: total })

    return

  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;