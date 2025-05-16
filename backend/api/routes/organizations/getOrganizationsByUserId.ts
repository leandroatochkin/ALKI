import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';

// Create router instance
const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.query;

    if (!userId) {
        return next(new ValidationError('Server error', 'userId is required'));
    }

  try {
    const [organizations] = await db.query('SELECT * FROM organizations WHERE userId = ?', [userId]) as any[];

    if (!Array.isArray(organizations) || organizations.length === 0) {
      res.status(200).json({ message: 'No organizations found for this tenant' })
      return
    }

    res.status(200).json(organizations);
  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;