import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';

// Create router instance
const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { propertyId } = req.query;

    if (!propertyId) {
        return next(new ValidationError('Server error', 'propertyId is required'));
    }

  try {
    const [services] = await db.query('SELECT * FROM services WHERE propertyId = ?', [propertyId]) as any[];

    if (!Array.isArray(services) || services.length === 0) {
      res.status(200).json({ message: 'No organizations found for this tenant' })
      return
    }

    res.status(200).json(services);
  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;