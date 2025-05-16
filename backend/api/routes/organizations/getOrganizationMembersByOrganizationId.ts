import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';

// Create router instance
const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { organizationId } = req.query;

    if (!organizationId) {
        return next(new ValidationError('Server error', 'userId is required'));
    }

  try {
    const [organizationMembers] = await db.query('SELECT * FROM organization_members WHERE organizationId = ?', [organizationId]) as any[];

    if (!Array.isArray(organizationMembers) || organizationMembers.length === 0) {
      res.status(200).json({ message: 'No members found for this organization' })
      return
    }

    res.status(200).json(organizationMembers);
  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;