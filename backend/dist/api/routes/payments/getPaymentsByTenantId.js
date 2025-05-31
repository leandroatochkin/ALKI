import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
// Create router instance
const router = express.Router();
// Define route handler
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { tenantId } = req.query;
    console.log(tenantId);
    if (!tenantId) {
        return next(new ValidationError('Server error', 'tenantId is required'));
    }
    try {
        const [payments] = await db.query('SELECT * FROM payments WHERE tenantId = ?', [tenantId]);
        console.log(payments);
        if (!Array.isArray(payments) || payments.length === 0) {
            res.status(200).json({ message: 'No payments found for this tenant' });
            return;
        }
        res.status(200).json(payments);
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
