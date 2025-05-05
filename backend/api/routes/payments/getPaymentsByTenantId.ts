import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError, ValidationError } from 'api/error_handling/errorModels';

// Create router instance
const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { tenantId } = req.query;

  console.log(tenantId)

    if (!tenantId) {
        return next(new ValidationError('Server error', 'tenantId is required'));
    }

  try {
    const [payments] = await db.query('SELECT * FROM payments WHERE tenantId = ?', [tenantId]) as any[];

    console.log(payments)

    if (!Array.isArray(payments) || payments.length === 0) {
      res.status(200).json({ message: 'No payments found for this tenant' })
      return
    }

    res.status(200).json(payments);
  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;