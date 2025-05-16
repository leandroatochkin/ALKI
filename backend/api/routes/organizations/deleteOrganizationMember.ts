import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';

// Create router instance
const router = express.Router();

// Define route handler
router.delete('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { memberId } = req.query;

    if (!memberId) {
        return next(new ValidationError('Server error', 'memberId is required'));
    }

  try {
    await db.query('DELETE FROM organization_members WHERE memberId = ?', [memberId]);


    res.status(200).json({ message: 'Member deleted successfully' });
    return
  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;